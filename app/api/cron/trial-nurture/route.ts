/**
 * GET /api/cron/trial-nurture
 *
 * Vercel cron job — runs hourly.
 * Sends the Very Good Marketing trial nurture sequence to trial users.
 *
 * Sequence (from VER-145 CMO copy):
 *   Day 1  (~1 hour post-signup):     Welcome & Orient
 *   Day 3  (72 hours post-signup):    Activation Push
 *   Day 7  (168 hours post-signup):   Value Reinforcement
 *   Day 14 (~2 days before expiry):   Trial-End Urgency
 *
 * Suppression:
 *   - Day 14 email is suppressed if the user has already upgraded
 *     (subscriptionStatus = ACTIVE). A paid welcome email is sent instead
 *     via the Stripe webhook — this cron only handles the suppression.
 *   - Users with subscriptionStatus = CANCELLED are skipped.
 *
 * Unsubscribe:
 *   Each email includes a signed unsubscribe link. Users who have opted out
 *   (nurtureEmailsOptOut = true) are skipped. The /api/unsubscribe route
 *   handles opt-out requests.
 *
 * Secured by CRON_SECRET header (set in Vercel env vars).
 * RESEND_ENABLED=false (default) means no emails fire — safe to deploy.
 */
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";

export const dynamic = "force-dynamic";

// ── Helpers ──────────────────────────────────────────────────────────────────

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

function daysFromNow(days: number, from: Date): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Build a signed unsubscribe URL for a business.
 * Token = HMAC-SHA256(businessId, UNSUBSCRIBE_SECRET).
 */
function buildUnsubscribeUrl(businessId: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://app.verygoodmarketing.com";
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET environment variable is required");
  const token = createHmac("sha256", secret)
    .update(businessId)
    .digest("hex");
  return `${base}/api/unsubscribe?id=${businessId}&token=${token}`;
}

function getFirstName(name: string): string {
  return name.split(" ")[0] ?? "there";
}

/** True if business is currently on a paid active subscription. */
function isUpgraded(subscriptionStatus: string | null | undefined): boolean {
  return subscriptionStatus === "ACTIVE";
}

/** True if business has been cancelled or is in a terminal state. */
function isCancelled(subscriptionStatus: string | null | undefined): boolean {
  return subscriptionStatus === "CANCELLED";
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorized execution
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    sentDay1: 0,
    sentDay3: 0,
    sentDay7: 0,
    sentDay14: 0,
    suppressedDay14: 0,
    errors: 0,
  };

  try {
    // ── Day 1 Welcome (1–2 hours post-signup) ────────────────────────────────
    // Window: signed up between 1h and 2h ago.
    const day1Businesses = await prisma.business.findMany({
      where: {
        createdAt: {
          gte: hoursAgo(2),
          lte: hoursAgo(1),
        },
        nurtureEmailsOptOut: false,
        isActive: true,
      },
    });

    for (const business of day1Businesses) {
      if (!business.email || isCancelled(business.subscriptionStatus)) continue;

      try {
        await sendEmail(business.email, "vgm_nurture_day1", {
          firstName: getFirstName(business.name),
          unsubscribeUrl: buildUnsubscribeUrl(business.id),
        });
        results.sentDay1++;
      } catch (err) {
        console.error(
          `[trial-nurture] Failed day1 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 3 Activation Push (72–73 hours post-signup) ──────────────────────
    const day3Businesses = await prisma.business.findMany({
      where: {
        createdAt: {
          gte: hoursAgo(73),
          lte: hoursAgo(72),
        },
        nurtureEmailsOptOut: false,
        isActive: true,
        OR: [
          { subscriptionStatus: "TRIAL" },
          { subscriptionStatus: null },
        ],
      },
    });

    for (const business of day3Businesses) {
      if (!business.email) continue;

      try {
        await sendEmail(business.email, "vgm_nurture_day3", {
          firstName: getFirstName(business.name),
          unsubscribeUrl: buildUnsubscribeUrl(business.id),
        });
        results.sentDay3++;
      } catch (err) {
        console.error(
          `[trial-nurture] Failed day3 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 7 Value Reinforcement (168–169 hours post-signup) ────────────────
    const day7Businesses = await prisma.business.findMany({
      where: {
        createdAt: {
          gte: hoursAgo(169),
          lte: hoursAgo(168),
        },
        nurtureEmailsOptOut: false,
        isActive: true,
        OR: [
          { subscriptionStatus: "TRIAL" },
          { subscriptionStatus: null },
        ],
      },
    });

    for (const business of day7Businesses) {
      if (!business.email) continue;

      try {
        await sendEmail(business.email, "vgm_nurture_day7", {
          firstName: getFirstName(business.name),
          unsubscribeUrl: buildUnsubscribeUrl(business.id),
        });
        results.sentDay7++;
      } catch (err) {
        console.error(
          `[trial-nurture] Failed day7 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 14 Trial-End Urgency (fire when ~2 days remain = day 12) ─────────
    // Trial is 14 days from createdAt. Fire when 2 days remain = day 12.
    // Window: signed up between 288h–289h ago (12 days).
    const day14Businesses = await prisma.business.findMany({
      where: {
        createdAt: {
          gte: hoursAgo(289),
          lte: hoursAgo(288),
        },
        nurtureEmailsOptOut: false,
        isActive: true,
      },
    });

    for (const business of day14Businesses) {
      if (!business.email || isCancelled(business.subscriptionStatus)) continue;

      // Suppression: if user already upgraded, skip the urgency email.
      if (isUpgraded(business.subscriptionStatus)) {
        results.suppressedDay14++;
        console.log(
          `[trial-nurture] Day 14 suppressed for upgraded business ${business.id}`
        );
        continue;
      }

      try {
        // Calculate days remaining in trial (trial = 14 days from createdAt)
        const trialEnd = daysFromNow(14, business.createdAt);
        const msRemaining = trialEnd.getTime() - Date.now();
        const daysRemaining = Math.max(1, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

        await sendEmail(business.email, "vgm_nurture_day14", {
          firstName: getFirstName(business.name),
          daysRemaining,
          unsubscribeUrl: buildUnsubscribeUrl(business.id),
        });
        results.sentDay14++;
      } catch (err) {
        console.error(
          `[trial-nurture] Failed day14 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[trial-nurture] Fatal cron error:", err);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }

  console.log("[trial-nurture] Cron completed:", results);
  return NextResponse.json({ ok: true, ...results });
}
