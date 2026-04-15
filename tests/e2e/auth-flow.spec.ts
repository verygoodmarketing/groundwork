/**
 * E2E tests — Authentication flow
 *
 * Tests that auth pages load correctly and that unauthenticated
 * access to protected routes is redirected appropriately.
 *
 * NOTE: Sign-up / sign-in submission tests require a real Supabase
 * instance and are skipped in CI unless E2E_AUTH_ENABLED=true.
 * The redirect and page-load tests run regardless.
 */
import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Login / Signup pages load
// ---------------------------------------------------------------------------

test.describe("Login page", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/login");
    expect(response?.status()).toBeLessThan(400);
  });

  test("has a visible email/password form", async ({ page }) => {
    await page.goto("/login");
    // Email input should be present
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    await expect(emailInput.first()).toBeVisible();
  });
});

test.describe("Signup page", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/signup");
    expect(response?.status()).toBeLessThan(400);
  });

  test("has a visible sign-up form", async ({ page }) => {
    await page.goto("/signup");
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    await expect(emailInput.first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Protected route redirect
// ---------------------------------------------------------------------------

test.describe("Protected routes — unauthenticated redirect", () => {
  test("unauthenticated /dashboard redirects away from /dashboard", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Should end up somewhere other than /dashboard (login or onboarding)
    await page.waitForURL((url) => !url.pathname.startsWith("/dashboard"), {
      timeout: 10_000,
    });
    const url = page.url();
    // Must redirect to login or onboarding
    expect(
      url.includes("/login") ||
        url.includes("/onboarding") ||
        url.includes("/signup")
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Onboarding step-1 (public)
// ---------------------------------------------------------------------------

test.describe("Onboarding step-1", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/onboarding/step-1");
    expect(response?.status()).toBeLessThan(400);
  });
});
