import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/PricingPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Pricing — Groundwork",
  description:
    "Simple, transparent pricing for local service businesses. Get your professional website, lead capture, and marketing tools starting at $49/month. 14-day free trial.",
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Groundwork",
  description:
    "All-in-one marketing platform for local service businesses — website builder, local SEO, lead capture, review requests, and email marketing.",
  url: `${APP_URL}/pricing`,
  brand: {
    "@type": "Brand",
    name: "Groundwork",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "49.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "49.00",
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
      price: "99.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99.00",
        priceCurrency: "USD",
        unitCode: "MON",
      },
      description:
        "The full toolkit for service businesses that want to grow — more leads, more reviews, more repeat jobs.",
      url: `${APP_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "199.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199.00",
        priceCurrency: "USD",
        unitCode: "MON",
      },
      description:
        "For established service companies managing multiple locations, teams, or a high volume of jobs.",
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
      price: "$49",
      priceMonthly: 49,
      period: "/month",
      description: "Get your business online and start capturing leads from day one.",
      features: [
        "Your own professional website — live in under an hour",
        "Free web address (yourbiz.groundworklocal.com) included",
        "Contact forms that funnel leads straight to your inbox",
        "Click-to-call button — customers tap and ring you instantly",
        "Built-in SEO so Google can find your business",
        "Email up to 200 customers and prospects",
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
      price: "$99",
      priceMonthly: 99,
      period: "/month",
      description: "The full toolkit for service businesses that want to grow — more leads, more reviews, more repeat jobs.",
      features: [
        "Everything in Starter",
        "Your own domain name (e.g. myjohnsonplumbing.com)",
        "Email up to 500 customers",
        "Send email blasts, promos, and seasonal offers",
        "Automated review requests — get more 5-star Google reviews",
        "Priority support — real humans, fast responses",
        "Advanced analytics — see which marketing is winning jobs",
        "First access to every new Groundwork feature",
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
        "For established service companies managing multiple locations, teams, or a high volume of jobs — with hands-on support.",
      features: [
        "Everything in Pro",
        "Email your entire customer list — no limits",
        "Your own dedicated account manager",
        "Custom integrations with your existing tools (CRM, scheduling, etc.)",
        "Manage multiple locations from one dashboard",
        "Branded reports to share with your team or partners",
        "Phone support — call us when you need us",
      ],
      cta: "Start free trial",
      paymentLink: process.env.STRIPE_PAYMENT_LINK_BUSINESS ?? null,
      highlighted: false,
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
