import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/PricingPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Pricing — GroundWork",
  description:
    "Simple, transparent pricing for local service businesses. Get your professional website, lead capture, and marketing tools starting at $39/month. 14-day free trial.",
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GroundWork",
  description:
    "Marketing platform for local service businesses — website builder, local SEO, and lead capture.",
  url: `${APP_URL}/pricing`,
  brand: {
    "@type": "Brand",
    name: "GroundWork",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "39.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "39.00",
        priceCurrency: "USD",
        unitCode: "MON",
      },
      description:
        "Get your business online and start capturing leads from day one.",
      url: `${APP_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "79.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79.00",
        priceCurrency: "USD",
        unitCode: "MON",
      },
      description:
        "The full toolkit for service businesses that want to grow — more leads, more reviews, more repeat jobs.",
      url: `${APP_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
  ],
};

/**
 * /pricing — standalone pricing page with Stripe Payment Links.
 */
export default function Pricing() {
  const plans = [
    {
      key: "STARTER" as const,
      name: "Starter",
      price: "$39",
      priceMonthly: 39,
      period: "/month",
      description: "Get your business online and start capturing leads from day one.",
      features: [
        "Your own professional website — live in under an hour",
        "Free web address (yourbiz.groundworklocal.com) included",
        "Contact forms that funnel leads straight to your inbox",
        "Click-to-call button — customers tap and ring you instantly",
        "Built-in SEO so Google can find your business",
        "Connect to Google Business Profile in one click",
        "See who's visiting your site and where they come from",
      ],
      cta: "Start free trial",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_STARTER ?? null,
      highlighted: false,
    },
    {
      key: "PRO" as const,
      name: "Pro",
      price: "$79",
      priceMonthly: 79,
      period: "/month",
      description: "The full toolkit for service businesses that want to grow — more leads, better visibility, and easier customer management.",
      features: [
        "Everything in Starter",
        "Your own domain name (e.g. myjohnsonplumbing.com)",
        "Priority support — real humans, fast responses",
        "Advanced analytics — see which marketing is winning jobs",
        "First access to every new GroundWork feature",
      ],
      cta: "Start free trial",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_PRO ?? null,
      highlighted: true,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingPage plans={plans} />
    </>
  );
}
