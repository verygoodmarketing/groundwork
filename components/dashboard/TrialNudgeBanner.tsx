"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, X } from "lucide-react";

export type BannerState =
  | { kind: "incomplete_onboarding"; lastIncompleteStep: number }
  | { kind: "trial_warning"; daysLeft: number }
  | { kind: "trial_urgency"; daysLeft: number }
  | { kind: "none" };

interface TrialNudgeBannerProps {
  state: BannerState;
}

/**
 * TrialNudgeBanner — renders the appropriate nudge based on user/trial state.
 *
 * States:
 *   1. incomplete_onboarding  — onboarding steps 2-5 not completed
 *   2. trial_warning          — trial, 7+ days elapsed (dismissable once/day)
 *   3. trial_urgency          — trial, 12+ days elapsed / <=2 days left (NOT dismissable)
 *   4. none                   — renders nothing
 *
 * Dismissal:
 *   - incomplete_onboarding: dismissable per session (sessionStorage)
 *   - trial_warning: dismissable once per day (localStorage with timestamp)
 *   - trial_urgency: NOT dismissable
 */
export function TrialNudgeBanner({ state }: TrialNudgeBannerProps) {
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    if (state.kind === "incomplete_onboarding") {
      const val = sessionStorage.getItem("trial_nudge_onboarding_dismissed");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(val === "true");
    } else if (state.kind === "trial_warning") {
      const stored = localStorage.getItem("trial_nudge_warning_dismissed_at");
      if (stored) {
        const dismissedAt = new Date(stored);
        const now = new Date();
        const msSinceDismiss = now.getTime() - dismissedAt.getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;
        setDismissed(msSinceDismiss < oneDayMs);
      } else {
        setDismissed(false);
      }
    } else {
      // trial_urgency is never dismissed; none doesn't render
      setDismissed(false);
    }
  }, [state.kind]);

  // Not yet hydrated — skip rendering to avoid flicker
  if (dismissed === null || state.kind === "none") return null;
  if (dismissed) return null;

  function handleDismiss() {
    if (state.kind === "incomplete_onboarding") {
      sessionStorage.setItem("trial_nudge_onboarding_dismissed", "true");
      setDismissed(true);
    } else if (state.kind === "trial_warning") {
      localStorage.setItem("trial_nudge_warning_dismissed_at", new Date().toISOString());
      setDismissed(true);
    }
  }

  if (state.kind === "incomplete_onboarding") {
    return (
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900">Your site isn&apos;t live yet.</p>
          <p className="text-sm text-blue-700 mt-0.5">You&apos;re 3 steps away.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/onboarding/step-${state.lastIncompleteStep}`}
            className="text-sm font-semibold text-blue-700 underline whitespace-nowrap"
          >
            Finish setup
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="text-blue-400 hover:text-blue-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (state.kind === "trial_warning") {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-900">
            You&apos;re halfway through your free trial.
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            Upgrade before Day 14 to keep your site live.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="text-sm font-semibold text-amber-700 underline whitespace-nowrap"
          >
            See plans
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="text-amber-400 hover:text-amber-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // trial_urgency — NOT dismissable
  return (
    <div className="rounded-xl bg-red-50 border border-red-300 p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-900">
          Your trial ends in {state.daysLeft} day{state.daysLeft === 1 ? "" : "s"}.
        </p>
        <p className="text-sm text-red-700 mt-0.5">
          Upgrade now to keep your site live — or lose your domain and data.
        </p>
      </div>
      <Link
        href="/pricing"
        className="text-sm font-semibold text-red-700 underline whitespace-nowrap"
      >
        Upgrade
      </Link>
    </div>
  );
}
