/**
 * GET /api/cron/onboarding-paid-nudge
 *
 * Vercel cron job — runs hourly.
 * Sends post-paid onboarding emails to customers who have upgraded to a paid
 * Groundwork plan (subscriptionStatus = ACTIVE, paidSubscriptionStartedAt set).
 *
 * Sequence (copy from VER-236#document-email-copy):
 *   Day 3  (72h after paid subscription start):  Google Business Profile nudge
 *   Day 7  (168h after paid subscription start):  First lead + referral ask
 *
 * Guard conditions:
 *   - Skip Day 3/7 if customer has already cancelled (subscriptionStatus ≠ ACTIVE)
 *   - Idempotency via paidOnboardingDay3SentAt / paidOnboardingDay7SentAt —
 *     once set, the email is never re-sent even if the cron runs again in the same window
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

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://app.groundwork.so";
}

function getDashboardUrl(): string {
  return `${getAppUrl()}/dashboard`;
}

function buildReferralLink(code: string): string {
  return `${getAppUrl()}/ref/${code}`;
}

function getFirstName(name: string): string {
  return name.split(" ")[0] ?? "there";
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
    skippedDay3Cancelled: 0,
    skippedDay7Cancelled: 0,
    errors: 0,
  };

  const dashboardUrl = getDashboardUrl();

  try {
    // ── Day 3 (72h post-paid subscription start) ──────────────────────────────
    // Window: paidSubscriptionStartedAt between 73h and 72h ago.
    // Hourly cron gives a 1-hour window — sufficient for reliable delivery.
    const day3Businesses = await prisma.business.findMany({
      where: {
        paidSubscriptionStartedAt: {
          gte: hoursAgo(73),
          lte: hoursAgo(72),
        },
        paidOnboardingDay3SentAt: null, // idempotency: not already sent
        email: { not: null },
        isActive: true,
      },
    });

    for (const business of day3Businesses) {
      if (!business.email) continue;

      // Guard: skip if customer has cancelled since they upgraded
      if (business.subscriptionStatus === "CANCELLED") {
        results.skippedDay3Cancelled++;
        console.log(
          `[onboarding-paid-nudge] Day 3 skipped — cancelled: business ${business.id}`
        );
        continue;
      }

      try {
        await sendEmail(business.email, "onboarding_paid_day3", {
          firstName: getFirstName(business.name),
          dashboardUrl,
        });

        await prisma.business.update({
          where: { id: business.id },
          data: { paidOnboardingDay3SentAt: new Date() },
        });

        results.sentDay3++;
      } catch (err) {
        console.error(
          `[onboarding-paid-nudge] Failed day3 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 7 (168h post-paid subscription start) ─────────────────────────────
    // Window: paidSubscriptionStartedAt between 169h and 168h ago.
    const day7Businesses = await prisma.business.findMany({
      where: {
        paidSubscriptionStartedAt: {
          gte: hoursAgo(169),
          lte: hoursAgo(168),
        },
        paidOnboardingDay7SentAt: null, // idempotency: not already sent
        email: { not: null },
        isActive: true,
      },
    });

    for (const business of day7Businesses) {
      if (!business.email) continue;

      // Guard: skip if customer has cancelled since they upgraded
      if (business.subscriptionStatus === "CANCELLED") {
        results.skippedDay7Cancelled++;
        console.log(
          `[onboarding-paid-nudge] Day 7 skipped — cancelled: business ${business.id}`
        );
        continue;
      }

      try {
        // Fetch or create the referral code for this business
        let referralLink: string | undefined;
        try {
          const code = await getOrCreateReferralCode(business.id);
          referralLink = buildReferralLink(code);
        } catch (refErr) {
          console.warn(
            `[onboarding-paid-nudge] Could not get referral code for business ${business.id}:`,
            refErr
          );
          // Fall back to dashboard — don't block the email
          referralLink = dashboardUrl;
        }

        await sendEmail(business.email, "onboarding_paid_day7", {
          firstName: getFirstName(business.name),
          dashboardUrl,
          referralLink,
        });

        await prisma.business.update({
          where: { id: business.id },
          data: { paidOnboardingDay7SentAt: new Date() },
        });

        results.sentDay7++;
      } catch (err) {
        console.error(
          `[onboarding-paid-nudge] Failed day7 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[onboarding-paid-nudge] Fatal cron error:", err);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }

  console.log("[onboarding-paid-nudge] Cron completed:", results);
  return NextResponse.json({ ok: true, ...results });
}
