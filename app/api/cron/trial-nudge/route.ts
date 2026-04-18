/**
 * GET /api/cron/trial-nudge
 *
 * Vercel cron job — runs daily at 09:00 UTC.
 * Sends mid-trial and urgency emails based on when a business's trial started.
 *
 * Day 7: mid-trial "halfway through" email
 * Day 12: urgency "2 days left" email
 *
 * Uses business.createdAt as a proxy for trial start date.
 * Businesses that have already upgraded (subscriptionStatus = ACTIVE) are skipped.
 *
 * Secured by CRON_SECRET header (set in Vercel env vars).
 * RESEND_ENABLED=false (default) means no emails fire — safe to deploy.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";

export const dynamic = "force-dynamic";

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorized execution
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { sentDay7: 0, sentDay12: 0, errors: 0 };

  try {
    // ── Day 7 mid-trial ───────────────────────────────────────────────────────
    // Trial started 7 days ago (±1h window), still on trial
    const day7Window = {
      gte: daysAgo(7 + 1 / 24),
      lte: daysAgo(7 - 1 / 24),
    };

    const businessesDay7 = await prisma.business.findMany({
      where: {
        createdAt: day7Window,
        OR: [{ subscriptionStatus: "TRIAL" }, { subscriptionStatus: null }],
      },
    });

    for (const business of businessesDay7) {
      if (!business.email) continue;

      try {
        await sendEmail(business.email, "day7_mid_trial", {
          firstName: business.name.split(" ")[0] ?? "there",
        });
        results.sentDay7++;
      } catch (err) {
        console.error(
          `[trial-nudge] Failed day7 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── Day 12 urgency ────────────────────────────────────────────────────────
    // Trial started 12 days ago (±1h window), still on trial
    const day12Window = {
      gte: daysAgo(12 + 1 / 24),
      lte: daysAgo(12 - 1 / 24),
    };

    const businessesDay12 = await prisma.business.findMany({
      where: {
        createdAt: day12Window,
        OR: [{ subscriptionStatus: "TRIAL" }, { subscriptionStatus: null }],
      },
    });

    for (const business of businessesDay12) {
      if (!business.email) continue;

      try {
        // Calculate the trial expiry date (14 days after signup)
        const trialExpiryDate = new Date(business.createdAt);
        trialExpiryDate.setDate(trialExpiryDate.getDate() + 14);
        const expiryFormatted = trialExpiryDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        await sendEmail(business.email, "day12_urgency", {
          firstName: business.name.split(" ")[0] ?? "there",
          trialExpiryDate: expiryFormatted,
        });
        results.sentDay12++;
      } catch (err) {
        console.error(
          `[trial-nudge] Failed day12 email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[trial-nudge] Fatal cron error:", err);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }

  console.log("[trial-nudge] Cron completed:", results);
  return NextResponse.json({ ok: true, ...results });
}
