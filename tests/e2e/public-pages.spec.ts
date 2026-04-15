/**
 * E2E tests — Unauthenticated pages
 *
 * Tests that all public-facing pages load without error, contain
 * expected content, and that key CTAs route correctly.
 *
 * These tests run against a live Next.js server (local dev or CI).
 * They do NOT require auth or a database connection.
 */
import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

test.describe("Homepage", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/GroundWork/i);
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    // Filter out known third-party noise (e.g. Stripe, analytics preloads)
    const appErrors = errors.filter(
      (e) =>
        !e.includes("stripe") &&
        !e.includes("analytics") &&
        !e.includes("favicon")
    );
    expect(appErrors).toHaveLength(0);
  });

  test("Start Free Trial CTA links to /onboarding/step-1", async ({ page }) => {
    await page.goto("/");
    // Look for primary CTA link
    const ctaLinks = page.locator('a[href="/onboarding/step-1"]');
    await expect(ctaLinks.first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Pricing page
// ---------------------------------------------------------------------------

test.describe("Pricing page", () => {
  test("loads and shows all 3 plan tiers", async ({ page }) => {
    const response = await page.goto("/pricing");
    expect(response?.status()).toBeLessThan(400);
    // All three plan names must be visible
    await expect(page.getByText("Starter").first()).toBeVisible();
    await expect(page.getByText("Pro").first()).toBeVisible();
    await expect(page.getByText("Business").first()).toBeVisible();
  });

  test("shows pricing for each tier", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("$49").first()).toBeVisible();
    await expect(page.getByText("$99").first()).toBeVisible();
    await expect(page.getByText("$199").first()).toBeVisible();
  });

  test("has CTA buttons visible", async ({ page }) => {
    await page.goto("/pricing");
    // At least one "Start free trial" button / link
    const ctaCount = await page
      .getByRole("link", { name: /start free trial/i })
      .count();
    expect(ctaCount).toBeGreaterThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

test.describe("Blog index", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/blog");
    expect(response?.status()).toBeLessThan(400);
  });

  test("shows at least one blog post link", async ({ page }) => {
    await page.goto("/blog");
    const links = page.locator('a[href^="/blog/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe("Blog individual post", () => {
  test("loads a known post without errors", async ({ page }) => {
    const response = await page.goto("/blog/best-website-for-plumbers");
    expect(response?.status()).toBeLessThan(400);
  });

  test("has a heading on the post page", async ({ page }) => {
    await page.goto("/blog/best-website-for-plumbers");
    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// SEO landing pages
// ---------------------------------------------------------------------------

const seoPages = [
  { path: "/for/plumbers", label: "plumbers" },
  { path: "/for/hvac", label: "hvac" },
  { path: "/for/electricians", label: "electricians" },
];

for (const { path, label } of seoPages) {
  test.describe(`SEO landing page: ${path}`, () => {
    test(`loads without errors`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
    });

    test(`has visible content`, async ({ page }) => {
      await page.goto(path);
      // Page should have a heading
      const headings = page.locator("h1, h2");
      await expect(headings.first()).toBeVisible();
    });
  });
}

// ---------------------------------------------------------------------------
// Demo page
// ---------------------------------------------------------------------------

test.describe("Demo page", () => {
  test("loads without errors", async ({ page }) => {
    const response = await page.goto("/demo");
    expect(response?.status()).toBeLessThan(400);
  });

  test("has visible content", async ({ page }) => {
    await page.goto("/demo");
    const headings = page.locator("h1, h2");
    await expect(headings.first()).toBeVisible();
  });
});
