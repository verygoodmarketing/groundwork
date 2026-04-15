/**
 * Unit tests for lib/dashboard/trial-nudge.ts
 *
 * Critical regression prevention: covers trial expiry logic, banner state
 * computation, and days-remaining calculation.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  isTrialExpired,
  computeBannerState,
  getTrialDaysRemaining,
  TRIAL_LENGTH_DAYS,
  TRIAL_WARNING_DAY,
  TRIAL_URGENCY_DAY,
} from "@/lib/dashboard/trial-nudge";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ---------------------------------------------------------------------------
// isTrialExpired
// ---------------------------------------------------------------------------

describe("isTrialExpired", () => {
  it("returns false for an ACTIVE subscription regardless of age", () => {
    expect(
      isTrialExpired({
        subscriptionStatus: "ACTIVE",
        businessCreatedAt: daysAgo(20),
      })
    ).toBe(false);
  });

  it("returns false when trial has not yet elapsed (day 13)", () => {
    expect(
      isTrialExpired({
        subscriptionStatus: null,
        businessCreatedAt: daysAgo(13),
      })
    ).toBe(false);
  });

  it("returns true when trial has fully elapsed (day 14)", () => {
    expect(
      isTrialExpired({
        subscriptionStatus: null,
        businessCreatedAt: daysAgo(14),
      })
    ).toBe(true);
  });

  it("returns true when TRIAL status and past day 14", () => {
    expect(
      isTrialExpired({
        subscriptionStatus: "TRIAL",
        businessCreatedAt: daysAgo(20),
      })
    ).toBe(true);
  });

  it("returns false for PAST_DUE status treated as subscribed-ish (isUnpaid check)", () => {
    // PAST_DUE is not "TRIAL" or null/undefined so isUnpaid = false → returns false
    expect(
      isTrialExpired({
        subscriptionStatus: "PAST_DUE",
        businessCreatedAt: daysAgo(20),
      })
    ).toBe(false);
  });

  it("returns false when status is undefined but only day 0", () => {
    expect(
      isTrialExpired({
        subscriptionStatus: undefined,
        businessCreatedAt: daysAgo(0),
      })
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getTrialDaysRemaining
// ---------------------------------------------------------------------------

describe("getTrialDaysRemaining", () => {
  it("returns TRIAL_LENGTH_DAYS on day 0", () => {
    expect(getTrialDaysRemaining(daysAgo(0))).toBe(TRIAL_LENGTH_DAYS);
  });

  it("returns correct value mid-trial", () => {
    expect(getTrialDaysRemaining(daysAgo(5))).toBe(TRIAL_LENGTH_DAYS - 5);
  });

  it("returns 0 (not negative) when past day 14", () => {
    expect(getTrialDaysRemaining(daysAgo(20))).toBe(0);
  });

  it("returns 1 on day 13", () => {
    expect(getTrialDaysRemaining(daysAgo(13))).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// computeBannerState
// ---------------------------------------------------------------------------

describe("computeBannerState", () => {
  const onboardingDone = { onboardingComplete: true, onboardingStep: 5 };

  it("returns none for a fully-onboarded ACTIVE subscriber", () => {
    const result = computeBannerState({
      ...onboardingDone,
      subscriptionStatus: "ACTIVE",
      businessCreatedAt: daysAgo(3),
    });
    expect(result.kind).toBe("none");
  });

  it("returns trial_urgency when day >= TRIAL_URGENCY_DAY on TRIAL status", () => {
    const result = computeBannerState({
      ...onboardingDone,
      subscriptionStatus: "TRIAL",
      businessCreatedAt: daysAgo(TRIAL_URGENCY_DAY),
    });
    expect(result.kind).toBe("trial_urgency");
    if (result.kind === "trial_urgency") {
      expect(result.daysLeft).toBeGreaterThanOrEqual(0);
    }
  });

  it("returns trial_warning when day >= TRIAL_WARNING_DAY but < TRIAL_URGENCY_DAY", () => {
    const result = computeBannerState({
      ...onboardingDone,
      subscriptionStatus: null,
      businessCreatedAt: daysAgo(TRIAL_WARNING_DAY),
    });
    expect(result.kind).toBe("trial_warning");
  });

  it("returns incomplete_onboarding when onboarding not done and not urgency/warning range", () => {
    const result = computeBannerState({
      onboardingComplete: false,
      onboardingStep: 2,
      subscriptionStatus: null,
      businessCreatedAt: daysAgo(2), // day 2 — below warning threshold
    });
    expect(result.kind).toBe("incomplete_onboarding");
    if (result.kind === "incomplete_onboarding") {
      expect(result.lastIncompleteStep).toBe(2);
    }
  });

  it("clamps lastIncompleteStep to [2, 5]", () => {
    const below = computeBannerState({
      onboardingComplete: false,
      onboardingStep: 0, // below 2
      subscriptionStatus: null,
      businessCreatedAt: daysAgo(2),
    });
    if (below.kind === "incomplete_onboarding") {
      expect(below.lastIncompleteStep).toBe(2);
    }

    const above = computeBannerState({
      onboardingComplete: false,
      onboardingStep: 99, // above 5
      subscriptionStatus: null,
      businessCreatedAt: daysAgo(2),
    });
    if (above.kind === "incomplete_onboarding") {
      expect(above.lastIncompleteStep).toBe(5);
    }
  });

  it("urgency takes priority over incomplete_onboarding", () => {
    const result = computeBannerState({
      onboardingComplete: false,
      onboardingStep: 2,
      subscriptionStatus: "TRIAL",
      businessCreatedAt: daysAgo(TRIAL_URGENCY_DAY),
    });
    expect(result.kind).toBe("trial_urgency");
  });
});
