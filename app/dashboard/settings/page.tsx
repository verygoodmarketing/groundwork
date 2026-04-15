import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import Link from "next/link";
import { isSubscriptionActive } from "@/lib/stripe/client";

export default async function SettingsPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/onboarding/step-1");

  const owner = await prisma.businessOwner.findUnique({
    where: { userId: user.id },
    include: { business: true },
  });

  if (!owner || !owner.business.onboardingComplete) {
    redirect("/dashboard");
  }

  const { business } = owner;
  const hasActiveSub = isSubscriptionActive(business.subscriptionStatus);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-surface-800/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-display font-bold text-xl text-[var(--foreground)]">
            GroundWork
          </Link>
          <span className="text-sm text-surface-400 font-body">{business.name}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-surface-400 hover:text-brand-400 transition-colors mb-4 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </Link>
          <h1 className="font-display text-2xl font-bold text-[var(--foreground)] mt-2">
            Account settings
          </h1>
        </div>

        {/* Account info */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">Account</h2>
          <div className="grid grid-cols-1 gap-3 text-sm font-body">
            <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
              <span className="text-surface-400">Email</span>
              <span className="text-[var(--foreground)]">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-surface-400">Account created</span>
              <span className="text-[var(--foreground)]">
                {business.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Business info */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
              Business info
            </h2>
            <Link
              href="/onboarding/step-2"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-semibold"
            >
              Edit →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm font-body">
            <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
              <span className="text-surface-400">Business name</span>
              <span className="text-[var(--foreground)]">{business.name}</span>
            </div>
            {business.phone && (
              <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
                <span className="text-surface-400">Phone</span>
                <span className="text-[var(--foreground)]">{business.phone}</span>
              </div>
            )}
            {business.category && (
              <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
                <span className="text-surface-400">Category</span>
                <span className="text-[var(--foreground)]">{business.category}</span>
              </div>
            )}
            {(business.city || business.state) && (
              <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
                <span className="text-surface-400">Location</span>
                <span className="text-[var(--foreground)]">
                  {[business.city, business.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            {business.serviceAreaRadius && (
              <div className="flex items-center justify-between py-2">
                <span className="text-surface-400">Service area</span>
                <span className="text-[var(--foreground)]">{business.serviceAreaRadius} miles</span>
              </div>
            )}
          </div>
          <p className="text-xs text-surface-500 font-body">
            To update your business details, use the{" "}
            <Link href="/onboarding/step-2" className="text-brand-400 hover:text-brand-300 transition-colors">
              onboarding editor
            </Link>
            .
          </p>
        </div>

        {/* Website */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
              Website
            </h2>
            <Link
              href="/onboarding/step-3"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-semibold"
            >
              Edit template →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm font-body">
            <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
              <span className="text-surface-400">Site URL</span>
              <a
                href={`https://${business.slug}.${process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "verygoodmarketing.com"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors truncate max-w-[200px]"
              >
                {business.slug}.{process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "verygoodmarketing.com"}
              </a>
            </div>
            {business.customDomain && (
              <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
                <span className="text-surface-400">Custom domain</span>
                <span className="text-[var(--foreground)]">{business.customDomain}</span>
              </div>
            )}
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
              Subscription
            </h2>
            <Link
              href="/dashboard/billing"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-semibold"
            >
              Manage billing →
            </Link>
          </div>
          {hasActiveSub ? (
            <div className="grid grid-cols-1 gap-3 text-sm font-body">
              <div className="flex items-center justify-between py-2 border-b border-surface-800/50">
                <span className="text-surface-400">Plan</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {business.planTier ?? "Active"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-surface-400">Status</span>
                <span
                  className={`font-semibold ${
                    business.subscriptionStatus === "ACTIVE"
                      ? "text-brand-400"
                      : business.subscriptionStatus === "TRIAL"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {business.subscriptionStatus}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-surface-400 text-sm font-body">
                No active subscription. Start a plan to publish your website and access all features.
              </p>
              <Link
                href="/pricing"
                className="block w-full text-center bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm"
              >
                View pricing plans
              </Link>
            </div>
          )}
        </div>

        {/* Email preferences */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
            Email preferences
          </h2>
          <div className="text-sm font-body text-surface-400">
            {business.nurtureEmailsOptOut ? (
              <p>You are currently opted out of marketing emails.</p>
            ) : (
              <p>
                You are subscribed to platform tips and growth emails. These help you get the most out of
                your website.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
