import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for GroundWork E2E tests.
 *
 * Tests run against a locally running Next.js dev server by default.
 * Set BASE_URL env var to test against a deployed environment.
 *
 * Default E2E_PORT is 4175 (not 3000) so tests do not attach to an unrelated
 * local dev server that may use different env (e.g. PRE_LAUNCH_MODE).
 *
 * @see https://playwright.dev/docs/test-configuration
 */

/** Uncommon port so local `next dev` on 3000/3001 is not reused with wrong env. */
const E2E_PORT = process.env.E2E_PORT ?? "4175";
const BASE_URL =
  process.env.BASE_URL ?? `http://127.0.0.1:${E2E_PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: BASE_URL,
    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",
    /* No headless override — defaults to headless */
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Start local dev server before running tests — skipped when BASE_URL is provided */
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: BASE_URL,
        // Reuse only our Playwright-spawned server on E2E_PORT — not :3000, where
        // a manual dev server may run with PRE_LAUNCH_MODE from .env.local.
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        // Full app routes (pricing, blog, dashboard redirects) are gated when
        // PRE_LAUNCH_MODE=true in .env.local — force off for deterministic e2e.
        env: {
          ...process.env,
          PORT: E2E_PORT,
          PRE_LAUNCH_MODE: "false",
        },
      },
});
