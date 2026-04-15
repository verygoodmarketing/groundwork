/**
 * GET /api/cron/paid-onboarding
 *
 * Vercel cron job — runs hourly.
 * Sends post-paid onboarding emails to customers who have upgraded to a paid plan.
 *
 * Sequence (copy from VER-236#document-email-copy):
 *   Day 1  (immediate — sent from Stripe webhook on customer.subscription.created)
 *   Day 3  (72 hours after planActivatedAt):  Google Business Profile setup
 *   Day 7  (168 hours after planActivatedAt): First lead check-in + referral CTA
 *
 * Day 1 is NOT sent from this cron — it fires immediately in the Stripe webhook handler.
 * This cron handles Day 3 and Day 7 only.
 *
 * Guard conditions:
 *   - Skip Day 3/7 if customer has already cancelled (subscriptionStatus = CANCELLED)
 *   - Deduplication relies on the planActivatedAt time-window arithmetic — each
 *     business falls in the window at most once per lifecycle stage.
 *
 * Secured by CRON_SECRET header (set in Vercel env vars).
 * RESEND_ENABLED=false (default) means no emails fire — safe to deploy.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";
import { getOrCreateReferralCode } from "@/lib/referral/utils";

export const dynamic = "force-dynamic";

// ── Helpers ──────────────────────────────────────────────────────────────────

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

function getFirstName(name: string): string {
  return name.split(" ")[0] ?? "there";
}

function isCancelled(subscriptionStatus: string | null | undefined): boolean {
  return subscriptionStatus === "CANCELLED";
}

function buildReferralLink(code: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://app.groundwork.so";
  return `${base}?ref=${code}`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorized execution
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    sentDay3: 0,
    sentDay7: 0,
    skippedCancelled: 0,
    errors: 0,
  };

  try {
    // ── Day 3 Google Business Profile (72–73 hours post-activation) ──────────
    // Window: planActivatedAt between 73h and 72h ago.
    const day3Businesses = await prisma.business.findMany({
      where: {
        planActivatedAt: {
          gte: hoursAgo(73),
          lte: hoursAgo(72),
        },
        subscriptionStatus: { not: "CANCELLED" },
      },
    });

    for (const business of day3Businesses) {
      if (!business.email || isCancelled(business.subscriptionStatus)) {
        results.skippedCancelled++;
        continue;
      }

      try {
        await sendEmail(business.email, "onboarding_paid_day3", {
          firstName: getFirstName(business.name),
        });
        results.sentDay3++;
      } catch (err) {
        console.error(
          `[paid-onboarding] Failed day3 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 7 First Lead Check-in + Referral CTA (168–169 hours post-activation) ──
    // Window: planActivatedAt between 169h and 168h ago.
    const day7Businesses = await prisma.business.findMany({
      where: {
        planActivatedAt: {
          gte: hoursAgo(169),
          lte: hoursAgo(168),
        },
        subscriptionStatus: { not: "CANCELLED" },
      },
    });

    for (const business of day7Businesses) {
      if (!business.email || isCancelled(business.subscriptionStatus)) {
        results.skippedCancelled++;
        continue;
      }

      try {
        // Get or create referral code for the referral CTA in this email
        const referralCode = await getOrCreateReferralCode(business.id);
        const referralLink = buildReferralLink(referralCode);

        await sendEmail(business.email, "onboarding_paid_day7", {
          firstName: getFirstName(business.name),
          referralLink,
        });
        results.sentDay7++;
      } catch (err) {
        console.error(
          `[paid-onboarding] Failed day7 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[paid-onboarding] Fatal cron error:", err);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }

  console.log("[paid-onboarding] Cron completed:", results);
  return NextResponse.json({ ok: true, ...results });
}
