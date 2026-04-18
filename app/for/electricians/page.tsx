import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: IndustryPageData = {
  slug: "electricians",
  pageTitle: "Electrician Website Builder — Get More Electrical Jobs Online | GroundWork",
  metaDescription:
    "Build a professional electrician website in under an hour. Rank for electrical services near you, capture leads with quote forms, and build trust with online reviews. Free to try.",
  h1: "Electrician Website Builder",
  heroSubcopy:
    "Get a professional electrician website live in under an hour — with local SEO, lead capture, and click-to-call so customers can find and contact you fast.",
  industryLabel: "Electrician",
  painPoint:
    "Customers search online before they call. Without a strong website, you're invisible to the homeowners and businesses in your area who need an electrician right now.",
  Icon: Zap,
  accentColor: "brand",
  trustSignals: [
    "Live in under an hour",
    "Local SEO built in",
    "License & credential display",
    "Free to try",
  ],
  features: [
    {
      icon: "🔌",
      title: "Showcase your electrical services clearly",
      description:
        "List all your services — panel upgrades, EV charger installation, rewiring, commercial electrical, emergency work. Customers find what they need and trust you immediately.",
    },
    {
      icon: "📜",
      title: "Display your license and credentials",
      description:
        "Build instant trust by showing your license number, certifications, and insurance information. Customers choosing between electricians will pick the one who looks most trustworthy.",
    },
    {
      icon: "📍",
      title: "Rank for electrician near me",
      description:
        "GroundWork sites are optimized for local search — structured data, service area coverage, and Google Business integration so you appear when homeowners and businesses search for electricians in your area.",
    },
    {
      icon: "📋",
      title: "Quote request forms that capture every lead",
      description:
        "Let visitors request a quote directly from your site. Get all the job details upfront — type of work, location, timeline — and follow up with confidence.",
    },
  ],
  testimonial: {
    name: "James W.",
    initials: "JW",
    business: "Westside Electrical",
    quote:
      "I finally built a proper website after 8 years of relying on referrals. GroundWork was so simple — I was live the same day. Now I get 2-3 new inquiries a week from people who found me online.",
    color: "from-yellow-500 to-amber-600",
  },
  faqs: [
    {
      question: "Can I show my electrical license and insurance on my website?",
      answer:
        "Yes. GroundWork lets you display your license number, certifications, and insurance information prominently — which is one of the biggest trust signals for customers choosing an electrician.",
    },
    {
      question: "Will I show up in Google searches for local electricians?",
      answer:
        "Yes. GroundWork builds in local SEO that helps you rank for searches like 'electrician near me', 'electrician [city]', 'panel upgrade [city]', and other high-intent terms. Most electricians see local search visibility within 2-4 weeks.",
    },
    {
      question: "I already have some customers — do I still need a website?",
      answer:
        "Referrals are great, but they have a ceiling. A website lets you grow beyond your current network by capturing people who are actively searching for an electrician right now. Most electricians who launch with GroundWork double their inbound inquiries within 3 months.",
    },
    {
      question: "What's included in the $39/month plan?",
      answer:
        "Everything you need to grow online: professional website, local SEO, lead capture forms, click-to-call, 200 email contacts, Google Business integration, and basic analytics. Free 14-day trial included.",
    },
  ],
  blogPost: {
    href: "/blog/best-website-for-electricians",
    title: "The Best Website for Electricians in 2026",
  },
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/electricians`,
    siteName: "GroundWork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function ElectriciansPage() {
  return <IndustryLandingPage data={data} />;
}
