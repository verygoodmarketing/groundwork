/**
 * GET /api/cron/onboarding-nudge
 *
 * Vercel cron job — runs daily at 08:00 UTC.
 * Sends onboarding nudge emails to users who signed up but haven't
 * completed onboarding at the 24h and 72h marks.
 *
 * Secured by CRON_SECRET header (set in Vercel env vars).
 * RESEND_ENABLED=false (default) means no emails fire — safe to deploy.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";

export const dynamic = "force-dynamic";

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

export async function GET(req: NextRequest) {
  // Validate cron secret to prevent unauthorized execution
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { sent24h: 0, sent72h: 0, errors: 0 };

  try {
    // ── 24h nudge ────────────────────────────────────────────────────────────
    // Signed up between 24h–25h ago, onboarding NOT complete
    const nudge24hWindow = {
      gte: hoursAgo(25),
      lte: hoursAgo(24),
    };

    const businesses24h = await prisma.business.findMany({
      where: {
        onboardingComplete: false,
        createdAt: nudge24hWindow,
      },
    });

    for (const business of businesses24h) {
      if (!business.email) continue;

      try {
        await sendEmail(business.email, "onboarding_nudge_24h", {
          firstName: business.name.split(" ")[0] ?? "there",
        });
        results.sent24h++;
      } catch (err) {
        console.error(
          `[onboarding-nudge] Failed 24h email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }

    // ── 72h nudge ────────────────────────────────────────────────────────────
    // Signed up between 72h–73h ago, onboarding NOT complete
    const nudge72hWindow = {
      gte: hoursAgo(73),
      lte: hoursAgo(72),
    };

    const businesses72h = await prisma.business.findMany({
      where: {
        onboardingComplete: false,
        createdAt: nudge72hWindow,
      },
    });

    for (const business of businesses72h) {
      if (!business.email) continue;

      try {
        await sendEmail(business.email, "onboarding_nudge_72h", {
          firstName: business.name.split(" ")[0] ?? "there",
        });
        results.sent72h++;
      } catch (err) {
        console.error(
          `[onboarding-nudge] Failed 72h email for business ${business.id}:`,
          err
        );
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[onboarding-nudge] Fatal cron error:", err);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }

  console.log("[onboarding-nudge] Cron completed:", results);
  return NextResponse.json({ ok: true, ...results });
}
