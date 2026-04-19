/**
 * UTM parameter capture utilities for attribution tracking
 * 
 * Usage:
 * 1. Capture UTM parameters from URL on landing page
 * 2. Store in cookies/sessionStorage to persist across signup flow
 * 3. Save to database when user creates account
 */

export interface UtmParameters {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

const UTM_COOKIE_NAME = "groundwork_utm";
const UTM_COOKIE_EXPIRY_DAYS = 30;

/**
 * Extract UTM parameters from URL search params
 */
export function extractUtmFromUrl(searchParams: URLSearchParams): UtmParameters {
  return {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    utm_content: searchParams.get("utm_content"),
    utm_term: searchParams.get("utm_term"),
  };
}

/**
 * Store UTM parameters in cookie (first-touch attribution)
 * Only stores if UTM parameters are present and cookie doesn't already exist
 */
export function storeUtmInCookie(utm: UtmParameters): void {
  if (typeof document === "undefined") return;

  // Only store if we have at least one UTM parameter
  const hasUtm = Object.values(utm).some((v) => v);
  if (!hasUtm) return;

  // Don't overwrite existing attribution (first-touch wins)
  const existing = getUtmFromCookie();
  if (existing?.utm_source) return;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + UTM_COOKIE_EXPIRY_DAYS);

  document.cookie = `${UTM_COOKIE_NAME}=${JSON.stringify(utm)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Retrieve UTM parameters from cookie
 */
export function getUtmFromCookie(): UtmParameters | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const utmCookie = cookies.find((c) => c.trim().startsWith(`${UTM_COOKIE_NAME}=`));

  if (!utmCookie) return null;

  try {
    const value = utmCookie.split("=")[1];
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

/**
 * Store UTM parameters in sessionStorage (backup to cookie)
 */
export function storeUtmInSession(utm: UtmParameters): void {
  if (typeof sessionStorage === "undefined") return;

  const hasUtm = Object.values(utm).some((v) => v);
  if (!hasUtm) return;

  sessionStorage.setItem(UTM_COOKIE_NAME, JSON.stringify(utm));
}

/**
 * Retrieve UTM parameters from sessionStorage
 */
export function getUtmFromSession(): UtmParameters | null {
  if (typeof sessionStorage === "undefined") return null;

  try {
    const value = sessionStorage.getItem(UTM_COOKIE_NAME);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

/**
 * Get UTM parameters from cookie or sessionStorage (fallback)
 */
export function getStoredUtm(): UtmParameters | null {
  return getUtmFromCookie() || getUtmFromSession();
}

/**
 * Capture and store UTM parameters from current URL
 * Call this on landing pages to capture attribution
 */
export function captureUtmParameters(searchParams: URLSearchParams): UtmParameters {
  const utm = extractUtmFromUrl(searchParams);
  storeUtmInCookie(utm);
  storeUtmInSession(utm);
  return utm;
}

/**
 * Convert UtmParameters to database format
 */
export function formatUtmForDb(utm: UtmParameters | null): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
} | null {
  if (!utm) return null;

  return {
    utmSource: utm.utm_source || undefined,
    utmMedium: utm.utm_medium || undefined,
    utmCampaign: utm.utm_campaign || undefined,
    utmContent: utm.utm_content || undefined,
    utmTerm: utm.utm_term || undefined,
  };
}
