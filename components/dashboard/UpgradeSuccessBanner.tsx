"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, PartyPopper } from "lucide-react";

/** Maps Stripe planKey (lowercase) to a display-friendly plan name. */
const PLAN_DISPLAY: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  business: "Business",
};

/**
 * UpgradeSuccessBanner — celebratory in-app banner shown after a successful upgrade.
 *
 * Reads `?checkout=success&plan=<planKey>` from the URL query params (set by the
 * Stripe success_url in stripeRouter.createCheckoutSession).
 * Cleans the URL params once shown to avoid re-displaying on refresh.
 * Auto-dismisses after 8 seconds; also manually dismissable.
 */
export function UpgradeSuccessBanner(): React.ReactElement | null {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [planName, setPlanName] = useState<string>("Starter");

  // Capture stable refs so the effect can list exhaustive deps without
  // re-running on every render cycle (Next.js router/searchParams are stable
  // objects but the linter can't verify that without explicit refs).
  const searchParamsRef = useRef(searchParams);
  const routerRef = useRef(router);

  useEffect(() => {
    const params = searchParamsRef.current;
    const nav = routerRef.current;
    const checkout = params.get("checkout");
    const plan = params.get("plan");

    if (checkout === "success") {
      setPlanName(PLAN_DISPLAY[plan ?? ""] ?? "Starter");
      setVisible(true);

      // Clean URL — remove checkout params without triggering a navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("checkout");
      url.searchParams.delete("plan");
      nav.replace(url.pathname + url.search, { scroll: false });

      // Auto-dismiss after 8 s
      const timer = setTimeout(() => setVisible(false), 8000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-br from-brand-600 to-emerald-600 p-5 text-white relative">
        {/* Close */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          <div className="shrink-0 mt-0.5">
            <PartyPopper className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-base leading-tight">
              You&apos;re now on {planName}!
            </p>
            <p className="text-brand-100 text-sm mt-1 font-body leading-snug">
              Your website is live and all features are unlocked. Welcome aboard!
            </p>
          </div>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="mt-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/60 rounded-full animate-[shrink_8s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
}
