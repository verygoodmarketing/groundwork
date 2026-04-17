# End-to-end (E2E) tests

GroundWork uses [Playwright](https://playwright.dev/) for browser tests. Specs live in `tests/e2e/` and are configured in `playwright.config.ts`.

## Prerequisites

1. **Dependencies** — `npm ci` or `npm install` in this repo.
2. **Browsers** — Install the Chromium build Playwright expects (once per machine or after upgrading `@playwright/test`):

   ```bash
   npx playwright install chromium
   ```

   CI runs `npx playwright install chromium --with-deps` (see `.github/workflows/ci.yml`).

## Commands

| Command | Purpose |
|--------|---------|
| `npm run test:e2e` | Run all E2E specs headlessly (Chromium). |
| `npm run test:e2e:ui` | Open Playwright UI for debugging. |

The test script sets `NODE_OPTIONS=--no-warnings` to reduce noisy Node warnings in the terminal.

## How the dev server is started

By default, Playwright **starts** `npm run dev` for you and waits until the app responds.

- **`BASE_URL`** — If set, Playwright **does not** start a server; it runs tests against that URL (e.g. a preview deployment or `http://localhost:3000`). You are responsible for having the app running with the right env.
- **`E2E_PORT`** — Defaults to **`4175`**. The spawned Next.js process listens on this port so tests do not attach to whatever you usually run on port 3000. Override with `E2E_PORT=4000 npm run test:e2e` if needed.
- **`PRE_LAUNCH_MODE`** — The Playwright-managed server sets **`PRE_LAUNCH_MODE=false`**. That matters because when pre-launch mode is on (`proxy.ts`), most routes redirect to `/` and the marketing site, pricing, blog, and dashboard behavior tests expect **do not** match.

If you use **`reuseExistingServer`** locally (non-CI), Playwright may reuse an existing process on `E2E_PORT`. That server should also run with pre-launch **off** for the same reasons.

## Pre-launch mode and `.env.local`

If `PRE_LAUNCH_MODE=true` is in `.env.local`, your **manual** `npm run dev` will gate routes. The **Playwright-spawned** server overrides this for E2E. If you point tests at your own server via `BASE_URL`, turn pre-launch off or tests will fail (waitlist-only homepage, no pricing copy, etc.).

## Authenticated dashboard tests

`tests/e2e/dashboard.spec.ts` includes tests that sign in and open `/dashboard`. They run **only** when both are set:

- `E2E_TEST_USER_EMAIL`
- `E2E_TEST_USER_PASSWORD`

If either is missing, those tests are **skipped** (intended for CI secrets or local `.env.test`).

## CI

The GitHub Actions workflow runs E2E after install, Prisma generate, and `playwright install chromium --with-deps`. Stub env vars are set so Next.js can boot without real Supabase/DB; `NEXT_PUBLIC_APP_URL` is aligned with the default E2E port (**`http://localhost:4175`**).

## What is covered

- **Public pages** (`public-pages.spec.ts`) — Home, pricing, blog, SEO `/for/*` pages, demo.
- **Auth flow** (`auth-flow.spec.ts`) — Login/signup routes, unauthenticated redirect away from `/dashboard`, onboarding step 1.
- **Dashboard** (`dashboard.spec.ts`) — Stripe/pricing smoke; authenticated scenarios when credentials are provided.

## Troubleshooting

| Symptom | What to check |
|--------|----------------|
| `Executable doesn't exist` / browser missing | Run `npx playwright install chromium`. |
| Port already in use | Stop whatever is bound to `E2E_PORT` (default 4175), or pick another port with `E2E_PORT`. |
| Wrong page content (e.g. unrelated product title) | You may be hitting another app on the URL; use the default Playwright server or verify `BASE_URL`. |
| Flaky console “errors” in dev | Tests filter known dev-only noise (e.g. webpack HMR). `next.config.ts` includes `allowedDevOrigins` for `127.0.0.1` / `localhost` to reduce HMR cross-origin warnings. |

## Further reading

- [Playwright test configuration](https://playwright.dev/docs/test-configuration)
- Playwright config in this repo: `playwright.config.ts`
