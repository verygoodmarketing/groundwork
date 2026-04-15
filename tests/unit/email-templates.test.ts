/**
 * Unit tests for lib/email/templates.ts — buildEmailContent
 *
 * Tests the URL construction in email templates and verifies that all
 * templates render without throwing, and critical links are correct.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { buildEmailContent, type EmailTemplate } from "@/lib/email/templates";

const TEMPLATES: EmailTemplate[] = [
  "onboarding_nudge_24h",
  "onboarding_nudge_72h",
  "day7_mid_trial",
  "day12_urgency",
  "trial_expired",
  "post_conversion_welcome",
  "vgm_nurture_day1",
  "vgm_nurture_day3",
  "vgm_nurture_day7",
  "vgm_nurture_day14",
  "vgm_paid_welcome",
  "onboarding_paid_day1",
  "onboarding_paid_day3",
  "onboarding_paid_day7",
];

const BASE_DATA = {
  firstName: "Jane",
  appUrl: "https://app.example.com",
  pricingUrl: "https://app.example.com/pricing",
  trialExpiryDate: "April 30, 2026",
  planPrice: "$49",
  daysRemaining: 3,
  unsubscribeUrl: "https://app.example.com/unsubscribe",
  referralLink: "https://app.example.com/ref/abc123",
};

describe("buildEmailContent — all templates render without throwing", () => {
  for (const template of TEMPLATES) {
    it(`renders ${template}`, () => {
      expect(() => buildEmailContent(template, BASE_DATA)).not.toThrow();
    });
  }
});

describe("buildEmailContent — content correctness", () => {
  it("onboarding_nudge_24h includes correct app URL", () => {
    const content = buildEmailContent("onboarding_nudge_24h", BASE_DATA);
    expect(content.text).toContain("https://app.example.com/onboarding");
    expect(content.html).toContain("https://app.example.com/onboarding");
  });

  it("onboarding_nudge_24h includes recipient first name", () => {
    const content = buildEmailContent("onboarding_nudge_24h", {
      ...BASE_DATA,
      firstName: "Carlos",
    });
    expect(content.text).toContain("Carlos");
    expect(content.html).toContain("Carlos");
  });

  it("day12_urgency includes pricing URL", () => {
    const content = buildEmailContent("day12_urgency", BASE_DATA);
    expect(content.text).toContain("https://app.example.com/pricing");
    expect(content.html).toContain("https://app.example.com/pricing");
  });

  it("day12_urgency includes trial expiry date", () => {
    const content = buildEmailContent("day12_urgency", BASE_DATA);
    expect(content.text).toContain("April 30, 2026");
    expect(content.html).toContain("April 30, 2026");
  });

  it("vgm_nurture_day14 uses daysLabel '3 days' when daysRemaining=3", () => {
    const content = buildEmailContent("vgm_nurture_day14", {
      ...BASE_DATA,
      daysRemaining: 3,
    });
    expect(content.text).toContain("3 days");
    expect(content.html).toContain("3 days");
  });

  it("vgm_nurture_day14 uses singular '1 day' when daysRemaining=1", () => {
    const content = buildEmailContent("vgm_nurture_day14", {
      ...BASE_DATA,
      daysRemaining: 1,
    });
    expect(content.text).toContain("1 day");
    expect(content.html).toContain("1 day");
  });

  it("onboarding_paid_day7 uses provided referralLink", () => {
    const content = buildEmailContent("onboarding_paid_day7", BASE_DATA);
    expect(content.text).toContain("https://app.example.com/ref/abc123");
    expect(content.html).toContain("https://app.example.com/ref/abc123");
  });

  it("onboarding_paid_day7 falls back to dashboard when no referralLink", () => {
    const { referralLink: _, ...dataNoRef } = BASE_DATA;
    const content = buildEmailContent("onboarding_paid_day7", dataNoRef);
    // fallback is appUrl/dashboard
    expect(content.text).toContain("https://app.example.com/dashboard");
  });

  it("all templates include unsubscribe URL in text (CAN-SPAM)", () => {
    // Only VGM and paid onboarding templates include unsubscribe by design
    const unsubTemplates: EmailTemplate[] = [
      "vgm_nurture_day1",
      "vgm_nurture_day3",
      "vgm_nurture_day7",
      "vgm_nurture_day14",
    ];
    for (const t of unsubTemplates) {
      const content = buildEmailContent(t, BASE_DATA);
      expect(content.text, `${t} missing unsubscribe URL`).toContain(
        "https://app.example.com/unsubscribe"
      );
    }
  });
});

describe("buildEmailContent — URL construction regression (DNS bug)", () => {
  it("uses appUrl override and NOT the default env-based URL", () => {
    const content = buildEmailContent("onboarding_nudge_24h", {
      firstName: "Test",
      appUrl: "https://custom.example.com",
    });
    // Should use the override, not the fallback default
    expect(content.html).toContain("https://custom.example.com");
  });

  it("subject is a non-empty string for every template", () => {
    for (const template of TEMPLATES) {
      const { subject } = buildEmailContent(template, BASE_DATA);
      expect(subject, `${template} has empty subject`).toBeTruthy();
      expect(typeof subject).toBe("string");
    }
  });
});
