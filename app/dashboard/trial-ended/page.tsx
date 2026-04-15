import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import { isSubscriptionActive } from "@/lib/stripe/client";
import { isTrialExpired } from "@/lib/dashboard/trial-nudge";
import Link from "next/link";
import { CreditCard, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trial Ended — GroundWork",
  robots: { index: false },
};

/**
 * /dashboard/trial-ended — Day 14 hard wall.
 *
 * Shown when a free trial user's 14-day window has elapsed.
 * Data is NOT deleted; the page blocks access behind an upgrade CTA.
 *
 * If the user has already upgraded, redirect them back to /dashboard.
 */
export default async function TrialEndedPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/onboarding/step-1");
  }

  const owner = await prisma.businessOwner.findUnique({
    where: { userId: user.id },
    include: { business: true },
  });

  if (!owner) {
    redirect("/onboarding/step-1");
  }

  const { business } = owner;

  // If they've upgraded, send them back to the dashboard
  if (isSubscriptionActive(business.subscriptionStatus)) {
    redirect("/dashboard");
  }

  // If the trial hasn't actually expired yet, go back to dashboard
  if (!isTrialExpired({ subscriptionStatus: business.subscriptionStatus, businessCreatedAt: business.createdAt })) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Minimal header — no nav links, user is locked out */}
      <header className="border-b border-surface-800/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-display font-bold text-xl text-[var(--foreground)]">GroundWork</span>
          <span className="text-sm text-surface-400 font-body">{business.name}</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Lock icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-800 flex items-center justify-center">
              <Lock className="w-8 h-8 text-surface-400" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold text-[var(--foreground)]">
              Your trial has ended
            </h1>
            <p className="text-surface-400 font-body text-base leading-relaxed">
              Your 14-day free trial is over. Your site, contacts, and all your data are safe — 
              subscribe to unlock your dashboard and keep your site live.
            </p>
          </div>

          {/* What they'll get back */}
          <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 text-left space-y-3">
            <p className="text-sm font-semibold text-[var(--foreground)]">What you get when you subscribe:</p>
            <ul className="space-y-2 text-sm text-surface-400 font-body">
              {[
                "Your website — live and published",
                "All contacts and leads captured",
                "Contact form and click-to-call",
                "Lead notifications to your inbox",
                "Local SEO and Google integration",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Primary CTA */}
          <div className="space-y-3">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 w-full bg-brand-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-brand-700 transition-colors text-base"
            >
              <CreditCard className="w-5 h-5" />
              Choose a plan — from $49/mo
            </Link>
            <p className="text-xs text-surface-400 font-body">
              No contract. Cancel any time. Data never deleted.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
