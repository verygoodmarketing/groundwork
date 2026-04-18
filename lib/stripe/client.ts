import Stripe from "stripe";

// Lazy initializer — throws at call time rather than module load time so the
// build succeeds even when STRIPE_SECRET_KEY is not set in the build env.
function createStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
    typescript: true,
  });
}

let _stripe: Stripe | undefined;

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    if (!_stripe) _stripe = createStripeClient();
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/**
 * Plan definitions — single source of truth for pricing metadata.
 * Payment Link URLs come from env vars (set after creating links in Stripe dashboard).
 */
export const PLANS = {
  STARTER: {
    name: "Starter",
    price: 3900, // cents
    interval: "month" as const,
    paymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_STARTER ?? null,
    priceId: process.env.STRIPE_STARTER_PRICE_ID ?? null,
    features: [
      "1 professional website",
      "GroundWork subdomain (yourbiz.groundworklocal.com)",
      "Contact form + lead inbox",
      "Click-to-call + mobile optimized",
      "Basic SEO + sitemap",
      "Up to 200 email contacts",
      "Google Business Profile integration",
      "Basic analytics",
    ],
  },
  PRO: {
    name: "Pro",
    price: 7900, // cents
    interval: "month" as const,
    paymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_PRO ?? null,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
    features: [
      "Everything in Starter",
      "Custom domain support",
      "Up to 500 email contacts",
      "Email broadcast + newsletter",
      "Review request campaigns",
      "Advanced analytics",
      "Priority email support",
      "Early access to new features",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

/**
 * Check if a business has an active subscription.
 * ACTIVE and TRIAL are treated as "subscribed".
 */
export function isSubscriptionActive(status: string | null | undefined): boolean {
  return status === "ACTIVE" || status === "TRIAL";
}
