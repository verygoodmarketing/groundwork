/**
 * Unit tests for isSubscriptionActive (from lib/stripe/client.ts).
 *
 * This function guards what features are accessible. Testing it prevents
 * regressions where a new status value breaks the gate incorrectly.
 *
 * STRIPE_SECRET_KEY is stubbed via vitest.config.ts env so the module
 * top-level guard doesn't throw in the test environment.
 */
import { describe, it, expect } from "vitest";
import { isSubscriptionActive } from "@/lib/stripe/client";

describe("isSubscriptionActive", () => {
  it("returns true for ACTIVE status", () => {
    expect(isSubscriptionActive("ACTIVE")).toBe(true);
  });

  it("returns true for TRIAL status", () => {
    expect(isSubscriptionActive("TRIAL")).toBe(true);
  });

  it("returns false for null (no subscription)", () => {
    expect(isSubscriptionActive(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isSubscriptionActive(undefined)).toBe(false);
  });

  it("returns false for CANCELLED", () => {
    expect(isSubscriptionActive("CANCELLED")).toBe(false);
  });

  it("returns false for PAST_DUE", () => {
    expect(isSubscriptionActive("PAST_DUE")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isSubscriptionActive("")).toBe(false);
  });
});
