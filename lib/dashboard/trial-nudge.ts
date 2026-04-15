import type { BannerState } from "@/components/dashboard/TrialNudgeBanner";

export const TRIAL_WARNING_DAY = 7;
export const TRIAL_URGENCY_DAY = 12;
export const TRIAL_LENGTH_DAYS = 14;

/**
 * Returns true when a free trial user's 14-day window has fully elapsed
 * and they have not converted to a paid subscription.
 *
 * Used by the dashboard to enforce the Day 14 hard wall.
 */
export function isTrialExpired(opts: {
  subscriptionStatus: string | null | undefined;
  businessCreatedAt: Date;
}): boolean {
  const { subscriptionStatus, businessCreatedAt } = opts;
  // Only applies to users who never converted (null / undefined status)
  const isUnpaid = !subscriptionStatus || subscriptionStatus === "TRIAL";
  if (!isUnpaid) return false;

  const msElapsed = Date.now() - businessCreatedAt.getTime();
  const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));
  return daysElapsed >= TRIAL_LENGTH_DAYS;
}

/**
 * Compute which trial nudge banner state to show.
 *
 * Priority order (highest wins):
 *   1. trial_urgency  (day 12+, i.e. <=2 days left)
 *   2. trial_warning  (day 7+)
 *   3. incomplete_onboarding
 *   4. none
 *
 * @param opts.onboardingComplete  Whether the user finished all onboarding steps
 * @param opts.onboardingStep      The last step the user reached (used to link them back)
 * @param opts.subscriptionStatus  e.g. "TRIAL", "ACTIVE", "CANCELLED", …
 * @param opts.businessCreatedAt   When the business record was created (trial start proxy)
 */
export function computeBannerState(opts: {
  onboardingComplete: boolean;
  onboardingStep: number;
  subscriptionStatus: string | null | undefined;
  businessCreatedAt: Date;
}): BannerState {
  const { onboardingComplete, onboardingStep, subscriptionStatus, businessCreatedAt } = opts;

  const isOnTrial = subscriptionStatus === "TRIAL" || !subscriptionStatus;

  if (isOnTrial) {
    const now = new Date();
    const msElapsed = now.getTime() - businessCreatedAt.getTime();
    const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));
    const daysLeft = TRIAL_LENGTH_DAYS - daysElapsed;

    if (daysElapsed >= TRIAL_URGENCY_DAY) {
      return { kind: "trial_urgency", daysLeft: Math.max(0, daysLeft) };
    }

    if (daysElapsed >= TRIAL_WARNING_DAY) {
      return { kind: "trial_warning", daysLeft: Math.max(0, daysLeft) };
    }
  }

  if (!onboardingComplete) {
    // lastIncompleteStep: the step they need to resume (clamped to 2-5 range)
    const lastIncompleteStep = Math.min(Math.max(onboardingStep, 2), 5);
    return { kind: "incomplete_onboarding", lastIncompleteStep };
  }

  return { kind: "none" };
}

/**
 * Returns the number of trial days remaining (0 if expired).
 * Only meaningful for users without an active subscription.
 */
export function getTrialDaysRemaining(businessCreatedAt: Date): number {
  const msElapsed = Date.now() - businessCreatedAt.getTime();
  const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));
  return Math.max(0, TRIAL_LENGTH_DAYS - daysElapsed);
}
