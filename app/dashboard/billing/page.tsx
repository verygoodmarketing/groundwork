import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import Link from "next/link";
import { isSubscriptionActive } from "@/lib/stripe/client";

export default async function BillingPage() {
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
            Versa
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
            Billing & subscription
          </h1>
        </div>

        {/* Current plan */}
        <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">Current plan</h2>

          {hasActiveSub ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    {business.planTier ?? "Active"} Plan
                  </p>
                  <p className="text-sm text-surface-400 mt-0.5">
                    Status:{" "}
                    <span className={`font-medium ${
                      business.subscriptionStatus === "ACTIVE" ? "text-brand-400" :
                      business.subscriptionStatus === "TRIAL" ? "text-amber-400" :
                      "text-red-400"
                    }`}>
                      {business.subscriptionStatus}
                    </span>
                  </p>
                </div>
                {business.stripeCurrentPeriodEnd && (
                  <p className="text-sm text-surface-400">
                    Renews{" "}
                    {business.stripeCurrentPeriodEnd.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <form action="/api/stripe/portal" method="POST">
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm"
                >
                  Manage billing, invoices, and payment method
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-surface-400 text-sm">
                You don&apos;t have an active subscription. Start a plan to publish your website and access all features.
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

        {/* Upgrade prompt */}
        {hasActiveSub && business.planTier !== "BUSINESS" && (
          <div className="rounded-xl border border-brand-800/40 bg-brand-950/30 p-6">
            <h2 className="font-display text-base font-semibold text-[var(--foreground)] mb-1">
              Upgrade your plan
            </h2>
            <p className="text-surface-400 text-sm mb-4">
              {business.planTier === "STARTER"
                ? "Upgrade to Pro to unlock custom domains, email marketing, and review request campaigns."
                : "Upgrade to Business for unlimited contacts, dedicated support, and multi-location features."}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-sm font-semibold"
            >
              See upgrade options →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
