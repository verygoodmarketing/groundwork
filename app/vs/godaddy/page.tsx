import type { Metadata } from "next";
import {
  ComparisonPage,
  type ComparisonPageData,
} from "@/components/vs/ComparisonPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: ComparisonPageData = {
  slug: "godaddy",
  pageTitle:
    "Groundwork vs GoDaddy Website Builder: Which Is Better for Local Service Businesses?",
  metaDescription:
    "Groundwork vs GoDaddy for local service businesses. Compare trade-specific templates, local SEO, lead capture, and review automation. See which platform actually grows your business.",
  h1: "Groundwork vs GoDaddy Website Builder: Which Is Better for Local Service Businesses?",
  intro:
    "GoDaddy is one of the most recognized names in web hosting and domains. Their website builder — GoDaddy Websites + Marketing — is marketed heavily to small businesses. But recognition doesn't always mean the right fit. Here's how Groundwork and GoDaddy compare for local service businesses.",
  tableRows: [
    {
      feature: "Templates for service trades",
      groundwork: "✅ 8+ trade-specific",
      competitor:
        "⚠️ Some business templates; not trade-specific",
    },
    {
      feature: "Built-in lead capture + lead inbox",
      groundwork: "✅ Included on all plans",
      competitor: "⚠️ Contact forms included; inbox limited",
    },
    {
      feature: "Click-to-call buttons",
      groundwork: "✅ Built-in",
      competitor: "⚠️ Available but requires configuration",
    },
    {
      feature: "Local SEO (auto-configured)",
      groundwork: "✅ Full local SEO setup",
      competitor: "⚠️ Basic SEO tools; local schema limited",
    },
    {
      feature: "Google Business Profile integration",
      groundwork: "✅ Built-in",
      competitor: "⚠️ Limited sync",
    },
    {
      feature: "Automated review requests",
      groundwork: "✅ Included (Pro plan)",
      competitor: "❌ Not available",
    },
    {
      feature: "Email marketing",
      groundwork: "✅ Included (Pro plan)",
      competitor: "⚠️ Add-on; limited on lower tiers",
    },
    {
      feature: "Analytics",
      groundwork: "✅ Privacy-first, built-in",
      competitor: "⚠️ Basic analytics; third-party needed for depth",
    },
    {
      feature: "Time to go live",
      groundwork: "✅ Under an hour",
      competitor: "✅ Designed to be fast",
    },
    {
      feature: "Customer support",
      groundwork: "✅ Email support",
      competitor: "✅ Phone + chat",
    },
    {
      feature: "All-in price",
      groundwork: "$39–$79/mo",
      competitor: "$10–$20/mo base, but add-ons stack up",
    },
  ],
  benefits: [
    {
      number: "1",
      title: "Groundwork is built for your trade — GoDaddy is built for everyone.",
      body: "GoDaddy's website builder is designed for the broadest possible audience: retail stores, restaurants, freelancers, local businesses. Groundwork's templates are designed specifically for service trades — plumbers, cleaners, landscapers, electricians. That means the right page sections (services, service areas, certifications, contact), the right language, and the right conversion flow for a homeowner who needs help now.",
    },
    {
      number: "2",
      title: "GoDaddy's real cost is higher than the headline price.",
      body: "GoDaddy advertises starter plans at $10–$13/month. But to get email marketing, appointment scheduling, and priority support, the cost jumps — and you may still need third-party tools for review management, local SEO optimization, and lead tracking. Groundwork bundles everything a local service business needs at $39–$79/month. No surprises.",
    },
    {
      number: "3",
      title: "Local SEO that doesn't require a manual.",
      body: "Both platforms offer basic SEO tools. But local SEO — ranking when someone searches \"plumber in [your city]\" — requires specific signals: local business schema, Google Business Profile sync, service area pages, and proper metadata. Groundwork auto-handles all of this. GoDaddy gives you settings to configure, and most business owners leave them at default.",
    },
    {
      number: "4",
      title: "Review request automation included.",
      body: "GoDaddy doesn't offer automated review requests. Groundwork Pro does. After you complete a job, you send a one-tap review request and your customer lands on your Google review page with one click. More reviews mean more trust, more calls, and better local rankings. It's one of the highest-ROI features available to local service businesses — and Groundwork includes it.",
    },
    {
      number: "5",
      title: "Everything for your growth in one dashboard.",
      body: "Groundwork brings together your website, lead inbox, local SEO, email marketing, review requests, and analytics in one place. GoDaddy offers a website builder, but growth tools are patchy — some included, some add-ons, some requiring outside integrations. For a business owner managing a team and handling jobs every day, the fewer dashboards the better.",
    },
  ],
  whoShouldUse: {
    heading: "Where GoDaddy Wins",
    body: "GoDaddy has strong domain registration and hosting — if you already have your domain there, that's worth something. They also offer 24/7 phone support, which some business owners prefer.\n\nIf you just need a basic presence and your primary concern is cost at any price point, GoDaddy's lowest tier is cheaper than Groundwork's. But for a local service business that wants actual growth — more leads, better rankings, more reviews — the comparison isn't close.",
  },
  bottomLine:
    "GoDaddy Website Builder is a serviceable tool for getting a basic web presence. Groundwork is a growth platform built specifically for local service businesses.\n\nThe question isn't which one is cheaper to start. It's which one helps you get more customers. For local service businesses, that's Groundwork.",
  ctaText: "Try Groundwork free for 14 days",
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  keywords: [
    "versa vs godaddy",
    "godaddy website builder alternative",
    "godaddy vs versa",
    "godaddy for plumbers contractors",
    "best website builder local business",
    "groundwork vs godaddy",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/godaddy`,
  },
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/vs/godaddy`,
    siteName: "Groundwork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GoDaddyComparisonPage() {
  return <ComparisonPage data={data} competitorName="GoDaddy Websites + Marketing" />;
}
