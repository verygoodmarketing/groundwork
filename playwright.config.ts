import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for GroundWork E2E tests.
 *
 * Tests run against a locally running Next.js dev server by default.
 * Set BASE_URL env var to test against a deployed environment.
 *
 * @see https://playwright.dev/docs/test-configuration
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

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
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
