"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/client";
import { createClient } from "@/lib/supabase/client";

type PlanKey = "STARTER" | "PRO";

type Props = {
  planKey: PlanKey;
  cta: string;
  highlighted: boolean;
};

/**
 * Client-only interactive CTA button for pricing plan cards.
 * Handles auth check + Stripe checkout session creation.
 * Extracted from PricingPage so the rest of the page can be server-rendered.
 *
 * CTA label adapts to auth state:
 *   - Authenticated: "Start my free trial" (they already have an account)
 *   - Unauthenticated: uses the `cta` prop (default: "Start free trial")
 *   - Loading: spinner
 */
export function PlanCTAButton({ planKey, cta, highlighted }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) => {
      setError(err.message ?? "Something went wrong. Please try again.");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });
  }, []);

  async function handleCTAClick() {
    setError(null);

    if (isAuthenticated === null) {
      return;
    }

    if (!isAuthenticated) {
      window.location.href = `/onboarding/step-1?next=/pricing`;
      return;
    }

    setIsLoading(true);
    createCheckoutSession.mutate({ planKey });
  }

  const buttonDisabled = isLoading || createCheckoutSession.isPending || isAuthenticated === null;

  // When authenticated, override the label to be more direct/contextual
  const ctaLabel = isAuthenticated ? "Start my free trial" : cta;

  return (
    <>
      {error && (
        <p className="text-xs text-red-500 mb-2 text-center">{error}</p>
      )}
      <button
        type="button"
        onClick={handleCTAClick}
        disabled={buttonDisabled}
        className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
          highlighted
            ? "bg-brand-600 text-white hover:bg-brand-500 shadow-lg"
            : "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/25"
        }`}
      >
        {isLoading || createCheckoutSession.isPending ? (
          <span className="inline-flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Redirecting…
          </span>
        ) : (
          ctaLabel
        )}
      </button>
    </>
  );
}
