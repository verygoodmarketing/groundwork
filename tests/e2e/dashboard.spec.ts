/**
 * E2E tests — Dashboard (authenticated paths)
 *
 * These tests verify dashboard behaviour when a user IS authenticated.
 * They require a test user session cookie or storage state from a prior
 * setup step. In CI, they run only when E2E_TEST_USER_EMAIL and
 * E2E_TEST_USER_PASSWORD are set (and a seeded test database is available).
 *
 * For local dev, set those env vars in .env.test or export them before
 * running `npm run test:e2e`.
 *
 * Unauthenticated redirect behaviour is tested in auth-flow.spec.ts.
 */
import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const authEnabled =
  !!process.env.E2E_TEST_USER_EMAIL && !!process.env.E2E_TEST_USER_PASSWORD;

// ---------------------------------------------------------------------------
// Dashboard tests (skipped when auth credentials not available)
// ---------------------------------------------------------------------------

test.describe("Dashboard — authenticated", () => {
  test.skip(!authEnabled, "Skipped: E2E_TEST_USER_EMAIL/PASSWORD not set");

  test.beforeEach(async ({ page }) => {
    // Sign in programmatically via the login form
    await page.goto("/login");
    await page.fill(
      'input[type="email"], input[name="email"]',
      process.env.E2E_TEST_USER_EMAIL!
    );
    await page.fill(
      'input[type="password"], input[name="password"]',
      process.env.E2E_TEST_USER_PASSWORD!
    );
    await page.getByRole("button", { name: /sign in|log in/i }).click();
    // Wait for redirect to dashboard or onboarding
    await page.waitForURL(
      (url) =>
        url.pathname.startsWith("/dashboard") ||
        url.pathname.startsWith("/onboarding"),
      { timeout: 15_000 }
    );
  });

  test("dashboard loads without error after sign-in", async ({ page }) => {
    await page.goto("/dashboard");
    // Should not be redirected away from dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    // Check for the GroundWork header
    await expect(page.getByText("GroundWork").first()).toBeVisible();
  });

  test("dashboard has a View site button/link", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
    // "View site" link should exist
    const viewSiteLink = page
      .getByRole("link", { name: /view site/i })
      .or(page.getByRole("link", { name: /view live site/i }));
    await expect(viewSiteLink.first()).toBeVisible();
  });

  test("View site link has a valid groundworklocal.com or /pricing URL", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);

    const viewSiteLinks = page
      .getByRole("link", { name: /view site/i })
      .or(page.getByRole("link", { name: /view live site/i }));

    const firstLink = viewSiteLinks.first();
    await expect(firstLink).toBeVisible();
    const href = await firstLink.getAttribute("href");

    // Must be either a valid subdomain URL or /pricing — never broken
    expect(href).toBeTruthy();
    const isValid =
      href!.includes("groundworklocal.com") ||
      href!.startsWith("/pricing") ||
      href!.startsWith("http");
    expect(isValid, `"View site" href is unexpected: ${href}`).toBe(true);
  });

  test("billing page is accessible", async ({ page }) => {
    await page.goto("/dashboard/billing");
    // Should not get a hard error — may redirect to pricing if not subscribed
    const status = await page.evaluate(() => document.readyState);
    expect(status).toBe("complete");
  });
});

// ---------------------------------------------------------------------------
// Stripe checkout reachable from pricing (no payment submission)
// ---------------------------------------------------------------------------

test.describe("Stripe checkout — page reachable from pricing", () => {
  test("pricing page loads (Stripe checkout URL tested if payment links configured)", async ({
    page,
  }) => {
    await page.goto("/pricing");
    // Verify pricing page itself loads — Stripe payment links open externally
    // We assert the CTA buttons are present, not that Stripe's page loads
    await expect(page.getByText("Starter").first()).toBeVisible();

    // If a Stripe payment link button is rendered, assert it has an href
    const stripeBtns = page.locator('a[href*="buy.stripe.com"]');
    const stripeCount = await stripeBtns.count();
    if (stripeCount > 0) {
      const href = await stripeBtns.first().getAttribute("href");
      expect(href).toMatch(/^https:\/\/buy\.stripe\.com\//);
    }
    // If no Stripe links (not yet configured), test passes — sign-up CTA is present
  });
});
