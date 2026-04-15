"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TrialCountdownBarProps {
  /** Days remaining in the trial (already clamped to 0+). */
  daysLeft: number;
}

/**
 * TrialCountdownBar — sticky top bar shown when ≤7 days remain in the trial.
 *
 * Urgency tier (0–2 days): red, non-dismissable.
 * Warning tier (3–7 days): amber, dismissable once per day via localStorage.
 */
export function TrialCountdownBar({ daysLeft }: TrialCountdownBarProps): React.ReactElement | null {
  const isUrgent = daysLeft <= 2;
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    if (isUrgent) {
      setDismissed(false);
      return;
    }
    const stored = localStorage.getItem("trial_countdown_bar_dismissed_at");
    if (stored) {
      const dismissedAt = new Date(stored);
      const msSince = Date.now() - dismissedAt.getTime();
      setDismissed(msSince < 24 * 60 * 60 * 1000);
    } else {
      setDismissed(false);
    }
  }, [isUrgent]);

  // Not yet hydrated
  if (dismissed === null) return null;
  if (dismissed) return null;

  const label =
    daysLeft === 0
      ? "Your trial expires today"
      : daysLeft === 1
      ? "1 day left in your trial — upgrade to keep your site live"
      : `${daysLeft} days left in your trial — upgrade to keep your site live`;

  function handleDismiss() {
    localStorage.setItem("trial_countdown_bar_dismissed_at", new Date().toISOString());
    setDismissed(true);
  }

  return (
    <div
      className={`sticky top-0 z-50 w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium ${
        isUrgent
          ? "bg-red-600 text-white"
          : "bg-amber-500 text-amber-950"
      }`}
    >
      <span className="text-center leading-snug">{label}</span>
      <Link
        href="/pricing"
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          isUrgent
            ? "bg-white text-red-700 hover:bg-red-50"
            : "bg-amber-950/20 text-amber-950 hover:bg-amber-950/30"
        }`}
      >
        Upgrade now
      </Link>
      {!isUrgent && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss trial countdown bar"
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
