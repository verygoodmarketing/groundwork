"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, X, Zap } from "lucide-react";

interface ProFeatureGateModalProps {
  /** Feature name shown in the modal heading (e.g. "Contacts", "Analytics"). */
  featureName: string;
  /**
   * When true the children are wrapped with an intercepting click handler that
   * opens the upgrade modal instead of following the link.
   * When false the children render unchanged.
   */
  isLocked: boolean;
  children: React.ReactNode;
}

/**
 * ProFeatureGateModal — wraps a locked feature element.
 *
 * When `isLocked` is true, clicking the child triggers an upgrade teaser modal
 * instead of navigating to the feature. Data is never shown — the user sees a
 * clear value-prop with a CTA to /pricing.
 *
 * When `isLocked` is false the children render normally without any wrapper.
 */
export function ProFeatureGateModal({
  featureName,
  isLocked,
  children,
}: ProFeatureGateModalProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Intercept clicks on locked children */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="contents text-left"
      >
        {children}
      </button>

      {/* Overlay + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="gate-modal-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
          />

          {/* Modal card */}
          <div className="relative bg-[var(--background)] border border-surface-700 rounded-2xl shadow-2xl w-full max-w-sm p-7 space-y-5">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-surface-500 hover:text-surface-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon + heading */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-900/50 border border-brand-800 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h2
                  id="gate-modal-title"
                  className="font-display font-bold text-lg text-[var(--foreground)]"
                >
                  {featureName} is a paid feature
                </h2>
                <p className="text-xs text-surface-400 font-body mt-0.5">Upgrade to unlock it</p>
              </div>
            </div>

            {/* Value prop */}
            <p className="text-sm text-surface-400 font-body leading-relaxed">
              Subscribe to a plan to unlock <strong className="text-[var(--foreground)]">{featureName}</strong> and
              all other paid features — including your live website, lead capture, and local SEO tools.
            </p>

            {/* Feature hint */}
            <div className="rounded-xl bg-surface-900 border border-surface-700 p-4 space-y-2">
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wide">
                What you unlock
              </p>
              <ul className="space-y-1.5 text-sm text-surface-300 font-body">
                {getFeatureHints(featureName).map((hint) => (
                  <li key={hint} className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    {hint}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/pricing"
                className="block w-full text-center bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm"
              >
                See plans — from $49/mo
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="block w-full text-center text-surface-400 hover:text-surface-300 font-medium py-2 text-sm transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Returns feature-specific value-prop hints for the modal. */
function getFeatureHints(featureName: string): string[] {
  const hints: Record<string, string[]> = {
    Contacts: [
      "See every lead who contacted you",
      "Full name, email, phone, and message",
      "Organized by newest first",
    ],
    Analytics: [
      "See how many visitors your site gets",
      "Track where leads come from",
      "Monitor click-to-call conversions",
    ],
    "Email Marketing": [
      "Send campaigns to your contact list",
      "Seasonal promos and follow-ups",
      "Track open and click rates",
    ],
    Reviews: [
      "Auto-request reviews after each job",
      "More 5-star Google reviews, faster",
      "Build social proof on autopilot",
    ],
  };

  return (
    hints[featureName] ?? [
      "Unlock this feature and more",
      "Your website live and published",
      "Lead capture and notifications",
    ]
  );
}
