import type { Metadata } from "next";
import {
  ComparisonPage,
  type ComparisonPageData,
} from "@/components/vs/ComparisonPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: ComparisonPageData = {
  slug: "squarespace",
  pageTitle:
    "Groundwork vs Squarespace: Which Is Better for Local Service Businesses?",
  metaDescription:
    "Groundwork vs Squarespace for local service businesses. Compare local SEO, lead capture, review requests, and pricing. See why plumbers and contractors choose Groundwork.",
  h1: "Groundwork vs Squarespace: Which Is Better for Local Service Businesses?",
  intro:
    "Squarespace is known for gorgeous design — it's the go-to for photographers, boutique hotels, and design studios. But if you're a plumber, landscaper, cleaner, or electrician, you probably don't need a runway-worthy website. You need one that gets the phone ringing.\n\nHere's how Groundwork and Squarespace compare for local service businesses.",
  tableRows: [
    {
      feature: "Templates built for service trades",
      groundwork: "✅ 8+ trade-specific",
      competitor: "❌ Design-focused, not trade-specific",
    },
    {
      feature: "Built-in lead capture + lead inbox",
      groundwork: "✅ Included on all plans",
      competitor: "⚠️ Basic forms; lead management limited",
    },
    {
      feature: "Click-to-call buttons",
      groundwork: "✅ Built-in",
      competitor: "⚠️ Manual configuration required",
    },
    {
      feature: "Local SEO (meta tags, sitemap, schema)",
      groundwork: "✅ Auto-configured",
      competitor: "⚠️ Manual setup; local schema not built-in",
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
      competitor: "❌ Squarespace Campaigns add-on required",
    },
    {
      feature: "Analytics",
      groundwork: "✅ Privacy-first, simple",
      competitor: "⚠️ Built-in but complex; no local focus",
    },
    {
      feature: "Time to go live",
      groundwork: "✅ Under an hour",
      competitor: "⚠️ Typical setup: several hours to days",
    },
    {
      feature: "All-in price",
      groundwork: "$39–$79/mo",
      competitor: "$16–$49/mo + Campaigns ($14+/mo)",
    },
  ],
  benefits: [
    {
      number: "1",
      title: "Beautiful design doesn't book jobs — clear calls-to-action do.",
      body: "Squarespace makes stunning websites. But for a local service business, \"stunning\" is less important than \"clear.\" Your customers want to know: What do you do? Do you cover my area? How do I contact you? Groundwork's templates are optimized for exactly these questions — big click-to-call buttons, service area sections, and quote request forms front and center.",
    },
    {
      number: "2",
      title: "Local SEO is built in, not an afterthought.",
      body: "Squarespace gives you the ability to edit meta tags and sitemaps, but local SEO — the signals that help you rank when someone searches \"electrician near me\" — requires manual configuration that most business owners skip or do incorrectly. Groundwork auto-generates local SEO markup, integrates with your Google Business Profile, and is built to help you rank in your service area from day one.",
    },
    {
      number: "3",
      title: "Lead capture that goes beyond a contact form.",
      body: "Both platforms include a contact form. But Groundwork routes every inquiry to a dedicated lead inbox, tracks your leads over time, and includes click-to-call buttons that work on mobile — where most local searches happen. Squarespace sends form submissions to email, with limited organization or follow-up options.",
    },
    {
      number: "4",
      title: "Review automation is a game-changer for local businesses.",
      body: "Reviews are the #1 trust signal for local service businesses. After a job, Groundwork Pro lets you send a one-click review request to your customer — landing them directly on your Google review page. Going from 10 reviews to 50 reviews can dramatically change how many new customers call you. Squarespace has no equivalent feature.",
    },
    {
      number: "5",
      title: "No design degree required.",
      body: "Squarespace's editing experience is polished but designed for people who care about design. Resizing columns, choosing fonts, managing blocks — it's a real time investment. Groundwork makes one deliberate trade-off: less design flexibility, in exchange for a site you can actually launch today. For a business owner, that's often the right call.",
    },
  ],
  whoShouldUse: {
    heading: "Who Should Use Squarespace?",
    body: "Squarespace is excellent for businesses where design is part of the brand — photographers, interior designers, wedding planners, creative agencies. If your website needs to be a portfolio and a conversion engine, Squarespace is worth the learning curve.\n\nFor local service businesses where speed, lead capture, and local search visibility matter more than visual perfection, Groundwork is purpose-built for the job.",
  },
  bottomLine:
    "Squarespace is a beautiful design platform. Groundwork is a growth platform for local service businesses.\n\nBoth create professional websites. Only Groundwork combines that website with local SEO, lead capture, review requests, and email marketing — in one platform, under an hour to launch.",
  ctaText: "Try Groundwork free for 14 days",
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  keywords: [
    "versa vs squarespace",
    "squarespace alternative for service businesses",
    "squarespace for plumbers",
    "squarespace for contractors",
    "squarespace local SEO",
    "groundwork vs squarespace",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/squarespace`,
  },
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/vs/squarespace`,
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

export default function SquarespaceComparisonPage() {
  return <ComparisonPage data={data} competitorName="Squarespace" />;
}
