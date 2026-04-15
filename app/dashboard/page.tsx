import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import Link from "next/link";
import { Globe, Settings, MessageSquare, BarChart3, CreditCard, AlertCircle } from "lucide-react";
import { isSubscriptionActive } from "@/lib/stripe/client";
import { TrialNudgeBanner } from "@/components/dashboard/TrialNudgeBanner";
import { ReferralCard } from "@/components/dashboard/ReferralCard";
import { computeBannerState } from "@/lib/dashboard/trial-nudge";

/**
 * /dashboard — post-onboarding home page.
 * Requires auth; incomplete onboarding → redirects back to resume step.
 */
export default async function DashboardPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/onboarding/step-1");
  }

  const owner = await prisma.businessOwner.findUnique({
    where: { userId: user.id },
    include: { business: { include: { site: true } } },
  });

  if (!owner) {
    redirect("/onboarding/step-2");
  }

  if (!owner.business.onboardingComplete) {
    const step = owner.business.onboardingStep ?? 1;
    redirect(`/onboarding/step-${step}`);
  }

  const { business } = owner;
  const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "verygoodmarketing.com";
  const siteUrl = `https://${business.slug}.${SITE_DOMAIN}`;
  const hasActiveSub = isSubscriptionActive(business.subscriptionStatus);
  const isPastDue = business.subscriptionStatus === "PAST_DUE";

  // Trial days remaining — trial is 14 days from business creation, no subscription yet
  const TRIAL_LENGTH_DAYS = 14;
  const isOnTrial = !hasActiveSub && !isPastDue;
  // eslint-disable-next-line react-hooks/purity -- server component, Date.now() runs on server not during client re-renders
  const msElapsed = Date.now() - business.createdAt.getTime();
  const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));
  const trialDaysRemaining = Math.max(0, TRIAL_LENGTH_DAYS - daysElapsed);
  const trialStatusLabel = isOnTrial
    ? `Free trial — ${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"} remaining`
    : null;

  const nudgeBannerState = computeBannerState({
    onboardingComplete: business.onboardingComplete,
    onboardingStep: business.onboardingStep,
    subscriptionStatus: business.subscriptionStatus,
    businessCreatedAt: business.createdAt,
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-surface-800/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-display font-bold text-xl text-[var(--foreground)]">GroundWork</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-surface-400 font-body">{business.name}</span>
            {business.planTier && (
              <span className="text-xs font-semibold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                {business.planTier}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Trial / onboarding nudge banner */}
        <TrialNudgeBanner state={nudgeBannerState} />

        {/* Past due alert */}
        {isPastDue && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Payment issue</p>
              <p className="text-sm text-red-700 mt-0.5">
                Your last payment failed. Please update your billing info to keep your site live.
              </p>
            </div>
            <form action="/api/stripe/portal" method="POST">
              <button
                type="submit"
                className="text-sm font-semibold text-red-700 underline whitespace-nowrap"
              >
                Update billing
              </button>
            </form>
          </div>
        )}

        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--foreground)]">
            Welcome back{business.name ? `, ${business.name}` : ""}
          </h1>
          <p className="text-surface-400 font-body mt-1">
            {hasActiveSub ? (
              <>
                Your website is live at{" "}
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 transition-colors"
                >
                  {siteUrl.replace("https://", "")}
                </a>
              </>
            ) : (
              "Start your subscription to publish your website and access all features."
            )}
          </p>
        </div>

        {/* Upgrade prompt for free/no subscription */}
        {!hasActiveSub && !isPastDue && (
          <div className="rounded-xl bg-gradient-to-br from-brand-600 to-emerald-700 p-6 text-white">
            <h2 className="font-display text-xl font-bold mb-2">
              Activate your subscription
            </h2>
            <p className="text-brand-100 text-sm mb-4">
              Choose a plan to publish your website, capture leads, and start growing your business. 14-day free trial — no credit card required.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors text-sm"
            >
              <CreditCard className="w-4 h-4" />
              View plans
            </Link>
          </div>
        )}

        {/* Quick actions — some gated behind subscription */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              icon: Globe,
              label: "View site",
              href: business.site?.isPublished ? siteUrl : "/pricing",
              external: business.site?.isPublished,
              locked: !business.site?.isPublished,
            },
            { icon: Settings, label: "Settings", href: "#", locked: false },
            {
              icon: MessageSquare,
              label: "Contacts",
              href: "#",
              locked: !hasActiveSub,
            },
            {
              icon: BarChart3,
              label: "Analytics",
              href: "#",
              locked: !hasActiveSub,
            },
          ].map(({ icon: Icon, label, href, external, locked }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center gap-2 rounded-xl border border-surface-700 bg-surface-900 p-5 text-center hover:border-surface-600 transition-colors relative ${
                locked ? "opacity-60" : ""
              }`}
            >
              {locked && (
                <span className="absolute top-2 right-2">
                  <svg className="w-3 h-3 text-surface-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              <Icon className="w-5 h-5 text-brand-400" />
              <span className="text-sm font-medium text-[var(--foreground)] font-body">{label}</span>
            </Link>
          ))}
        </div>

        {/* Site status */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">Site status</h2>
            {hasActiveSub && business.site?.isPublished && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
              >
                View live site
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                hasActiveSub && business.site?.isPublished
                  ? "bg-brand-500 animate-pulse"
                  : "bg-surface-600"
              }`}
            />
            <span className="text-sm font-body text-[var(--foreground)]">
              {!hasActiveSub
                ? (trialStatusLabel ?? "No active subscription")
                : business.site?.isPublished
                ? "Live"
                : "Offline"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-body">
            <div>
              <p className="text-surface-400">Template</p>
              <p className="text-[var(--foreground)] mt-0.5">{business.site?.templateId ?? "—"}</p>
            </div>
            <div>
              <p className="text-surface-400">Category</p>
              <p className="text-[var(--foreground)] mt-0.5">{business.category ?? "—"}</p>
            </div>
            {hasActiveSub && business.stripeCurrentPeriodEnd && (
              <div>
                <p className="text-surface-400">Billing renews</p>
                <p className="text-[var(--foreground)] mt-0.5">
                  {business.stripeCurrentPeriodEnd.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Billing management — only show if subscribed */}
        {hasActiveSub && (
          <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-semibold text-[var(--foreground)]">
                Billing & subscription
              </h2>
              <p className="text-surface-400 font-body text-sm mt-0.5">
                Manage your plan, payment method, and invoices.
              </p>
            </div>
            <Link
              href="/dashboard/billing"
              className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
            >
              Manage
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* Referral card — client component, shows after 7+ days */}
        <ReferralCard />

        {/* Coming soon */}
        <div className="rounded-xl border border-dashed border-surface-700 p-6 text-center">
          <p className="text-surface-400 font-body text-sm">
            More features coming soon — lead management, email marketing, review requests, and more.
          </p>
        </div>
      </main>
    </div>
  );
}
