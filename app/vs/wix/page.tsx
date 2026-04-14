import type { Metadata } from "next";
import {
  ComparisonPage,
  type ComparisonPageData,
} from "@/components/vs/ComparisonPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: ComparisonPageData = {
  slug: "wix",
  pageTitle:
    "Groundwork vs Wix: Which Website Builder Is Better for Local Service Businesses?",
  metaDescription:
    "Groundwork vs Wix for local service businesses. See why plumbers, contractors, and cleaners choose Groundwork over Wix for local SEO, lead capture, and review automation.",
  h1: "Groundwork vs Wix: Which Website Builder Is Better for Local Service Businesses?",
  intro:
    "If you're a plumber, cleaner, landscaper, or contractor shopping for a website builder, you've probably come across Wix. It's everywhere — TV ads, Google results, billboards. But Wix was built for everyone: bloggers, artists, e-commerce stores. That means it was not really built for you.\n\nGroundwork is. Here's how the two compare.",
  tableRows: [
    {
      feature: "Templates built for your trade",
      groundwork: "✅ 8+ trade-specific designs",
      competitor: "❌ Generic templates only",
    },
    {
      feature: "Built-in lead capture + lead inbox",
      groundwork: "✅ Included on all plans",
      competitor: "❌ Requires Wix Ascend add-on",
    },
    {
      feature: "Click-to-call buttons",
      groundwork: "✅ Built-in",
      competitor: "⚠️ Manual setup required",
    },
    {
      feature: "Local SEO (meta tags, sitemap, schema)",
      groundwork: "✅ Auto-configured",
      competitor: "⚠️ Manual setup, easy to miss",
    },
    {
      feature: "Google Business Profile integration",
      groundwork: "✅ Built-in",
      competitor: "❌ Not included",
    },
    {
      feature: "Automated review requests",
      groundwork: "✅ Included (Pro plan)",
      competitor: "❌ Not available",
    },
    {
      feature: "Email marketing",
      groundwork: "✅ Included (Pro plan)",
      competitor: "❌ Wix Ascend add-on (~$45+/mo extra)",
    },
    {
      feature: "Site analytics",
      groundwork: "✅ Privacy-first, no cookie banners",
      competitor: "⚠️ Basic free; full analytics costs extra",
    },
    {
      feature: "Time to go live",
      groundwork: "✅ Under an hour",
      competitor: "⚠️ Typically days with Wix editor",
    },
    {
      feature: "All-in price",
      groundwork: "$39–$79/mo",
      competitor: "$17–$159/mo + add-ons",
    },
  ],
  benefits: [
    {
      number: "1",
      title: "Templates made for your trade, not a yoga studio.",
      body: "Wix has 900+ templates — for restaurants, musicians, portfolios, online stores. Versatile, sure. But you need a plumbing site or a cleaning company page. Groundwork's templates are designed for service businesses: the right sections (services, service areas, contact), the right calls-to-action (call now, get a quote), and the right first impression for a local customer who's ready to hire.",
    },
    {
      number: "2",
      title: "Lead capture is baked in, not bolted on.",
      body: "With Wix, you get a basic contact form — and that's about it. Want leads routed to your inbox, inquiry management, or automated follow-ups? You need Wix Ascend, which adds $45+/month to your bill. Groundwork includes contact forms, a lead inbox, and click-to-call buttons on every plan, with zero add-ons required.",
    },
    {
      number: "3",
      title: "Local SEO that works for nearby searches.",
      body: "When a homeowner types \"plumber near me\" or \"cleaning service [your city],\" you want your business to appear. Groundwork automatically configures the local SEO signals that make this happen: title tags, meta descriptions, XML sitemaps, and Google Business Profile sync. With Wix, you can configure these things manually — but only if you know what to look for and what to fill in.",
    },
    {
      number: "4",
      title: "Review requests without a third-party subscription.",
      body: "Online reviews drive more local business than almost anything else. Groundwork Pro includes automated review request emails: after each job, your customer gets a one-click link straight to your Google review page. Wix doesn't have this feature at all. You'd need a separate tool like Podium or Broadly — typically $200+ per month.",
    },
    {
      number: "5",
      title: "Simple enough for a busy owner to actually use.",
      body: "Wix's drag-and-drop editor is powerful, but power comes with complexity. Most service business owners don't have time to become web designers. Groundwork is intentionally limited: add your business name, phone number, services, and photos. You're live. Average setup time: under an hour.",
    },
  ],
  whoShouldUse: {
    heading: "Who Should Use Wix?",
    body: "Wix is a strong fit if you need extreme creative flexibility, run an online store, or enjoy building and customizing websites. For general-purpose use cases — especially if you have the time to figure it out — it's a capable tool.\n\nFor local service businesses where every hour counts and every lead matters, Wix's complexity and add-on pricing add friction that Groundwork removes.",
  },
  bottomLine:
    "Wix is a general-purpose website builder. Groundwork is purpose-built for local service businesses.\n\nIf you want more calls, better Google rankings, and a steady stream of 5-star reviews without stitching together five different tools, Groundwork gets you there faster and for less money.",
  ctaText: "Try Groundwork free for 14 days",
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  keywords: [
    "versa vs wix",
    "wix alternative for service businesses",
    "best website builder for plumbers",
    "wix for contractors",
    "groundwork vs wix",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/wix`,
  },
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/vs/wix`,
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

export default function WixComparisonPage() {
  return <ComparisonPage data={data} competitorName="Wix" />;
}
