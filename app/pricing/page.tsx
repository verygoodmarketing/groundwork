import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Versa",
  description:
    "Simple, transparent pricing for local service businesses. Get your professional website, lead capture, and marketing tools starting at $49/month. 14-day free trial.",
};

/**
 * /pricing — standalone pricing page with Stripe Payment Links.
 */
export default function Pricing() {
  const plans = [
    {
      key: "STARTER" as const,
      name: "Starter",
      price: "$49",
      priceMonthly: 49,
      period: "/month",
      description: "Everything you need to get online and start getting leads.",
      features: [
        "1 professional website",
        "Versa subdomain (yourbiz.versa.app)",
        "Contact forms + lead inbox",
        "Click-to-call + mobile-optimized",
        "Basic SEO + sitemap",
        "Up to 200 email contacts",
        "Google Business Profile integration",
        "Basic analytics",
      ],
      cta: "Get started",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_STARTER ?? null,
      highlighted: false,
    },
    {
      key: "PRO" as const,
      name: "Pro",
      price: "$99",
      priceMonthly: 99,
      period: "/month",
      description: "For businesses ready to grow faster and keep more customers.",
      features: [
        "Everything in Starter",
        "Custom domain support",
        "Up to 500 email contacts",
        "Email broadcast + newsletter",
        "Review request campaigns",
        "Priority email support",
        "Advanced analytics",
        "Early access to new features",
      ],
      cta: "Start free trial",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_PRO ?? null,
      highlighted: true,
    },
    {
      key: "BUSINESS" as const,
      name: "Business",
      price: "$199",
      priceMonthly: 199,
      period: "/month",
      description:
        "For growing businesses that need more power and white-glove support.",
      features: [
        "Everything in Pro",
        "Unlimited email contacts",
        "Dedicated account manager",
        "Custom integrations",
        "Multi-location support",
        "White-label reports",
        "Phone support",
      ],
      cta: "Start free trial",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_BUSINESS ?? null,
      highlighted: false,
    },
  ];

  return <PricingPage plans={plans} />;
}
