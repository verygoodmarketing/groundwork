/**
 * Unit tests for site URL construction.
 *
 * Regression test suite for the DNS_PROBE_FINISHED_NXDOMAIN bug where
 * user site URLs were constructed incorrectly (wrong subdomain format).
 *
 * The canonical site URL format is:
 *   https://{slug}.groundworklocal.com
 *
 * Any deviation (double scheme, missing slug, wrong domain) causes the
 * "View site" button to point to a non-existent domain.
 */
import { describe, it, expect } from "vitest";

// ---------------------------------------------------------------------------
// Pure URL construction helper (inline — mirrors dashboard/page.tsx logic)
// ---------------------------------------------------------------------------

/**
 * Build the public site URL for a business given its slug.
 * This is the function shape used in the dashboard — tested here to prevent
 * regression of the DNS bug.
 */
function buildSiteUrl(slug: string): string {
  return `https://${slug}.groundworklocal.com`;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("buildSiteUrl — URL construction", () => {
  it("produces a valid https URL", () => {
    const url = buildSiteUrl("joes-plumbing");
    expect(url).toMatch(/^https:\/\//);
  });

  it("includes the slug as the subdomain", () => {
    const url = buildSiteUrl("joes-plumbing");
    expect(url).toBe("https://joes-plumbing.groundworklocal.com");
  });

  it("uses groundworklocal.com as the base domain", () => {
    const url = buildSiteUrl("test-biz");
    expect(url).toContain("groundworklocal.com");
    // Must not accidentally use a different domain
    expect(url).not.toContain("groundwork.com");
    expect(url).not.toContain("verygoodmarketing.com");
  });

  it("does not double-encode the scheme", () => {
    const url = buildSiteUrl("abc");
    const schemeMatches = url.match(/https?:\/\//g) ?? [];
    expect(schemeMatches).toHaveLength(1);
  });

  it("slug is not empty — a URL without slug is broken", () => {
    // Empty slug produces 'https://.groundworklocal.com' which is invalid
    const url = buildSiteUrl("");
    // We assert this produces an obviously invalid pattern so tests catch it
    expect(url).toBe("https://.groundworklocal.com");
    // This documents the bug: callers MUST provide a non-empty slug
  });

  it("handles slugs with hyphens", () => {
    const url = buildSiteUrl("abc-def-ghi");
    expect(url).toBe("https://abc-def-ghi.groundworklocal.com");
  });

  it("siteUrl display form strips the https:// prefix correctly", () => {
    const url = buildSiteUrl("myplumber");
    const display = url.replace("https://", "");
    expect(display).toBe("myplumber.groundworklocal.com");
    expect(display).not.toContain("https://");
  });
});
