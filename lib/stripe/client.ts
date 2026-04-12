import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});

/**
 * Plan definitions — single source of truth for pricing metadata.
 * Payment Link URLs come from env vars (set after creating links in Stripe dashboard).
 */
export const PLANS = {
  STARTER: {
    name: "Starter",
    price: 4900, // cents
    interval: "month" as const,
    paymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_STARTER ?? null,
    priceId: process.env.STRIPE_PRICE_ID_STARTER ?? null,
    features: [
      "1 professional website",
      "Versa subdomain (yourbiz.versa.app)",
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
    price: 9900, // cents
    interval: "month" as const,
    paymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_PRO ?? null,
    priceId: process.env.STRIPE_PRICE_ID_PRO ?? null,
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
  BUSINESS: {
    name: "Business",
    price: 19900, // cents
    interval: "month" as const,
    paymentLinkUrl: process.env.STRIPE_PAYMENT_LINK_BUSINESS ?? null,
    priceId: process.env.STRIPE_PRICE_ID_BUSINESS ?? null,
    features: [
      "Everything in Pro",
      "Unlimited email contacts",
      "Email marketing automation",
      "Dedicated account manager",
      "Phone support",
      "Multi-location support",
      "White-label reports",
      "Custom integrations",
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
