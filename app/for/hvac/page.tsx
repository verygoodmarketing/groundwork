import type { Metadata } from "next";
import { Thermometer } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: IndustryPageData = {
  slug: "hvac",
  pageTitle: "HVAC Company Website Builder — Get More Heating & Cooling Jobs | GroundWork",
  metaDescription:
    "Build a professional HVAC company website in under an hour. Get found for AC repair, furnace installation, and heating & cooling in your area. Local SEO, lead forms, and click-to-call included. Free to try.",
  h1: "HVAC Company Website Builder",
  heroSubcopy:
    "Get a professional HVAC website live in under an hour — optimized for local search, with lead forms and click-to-call so you never miss a job.",
  industryLabel: "HVAC Company",
  painPoint:
    "When someone's furnace breaks in January or their AC dies in August, they search Google immediately. If you don't have a strong web presence, that emergency call goes to your competitor.",
  Icon: Thermometer,
  accentColor: "brand",
  trustSignals: [
    "Emergency call buttons",
    "Local SEO built in",
    "Lead capture forms",
    "Free to try",
  ],
  features: [
    {
      icon: "☎️",
      title: "Emergency call buttons for urgent jobs",
      description:
        "HVAC emergencies happen 24/7. Prominent click-to-call buttons on every page mean customers in crisis can reach you in one tap — from their phone, on any page.",
    },
    {
      icon: "📍",
      title: "Rank for AC repair and heating near me",
      description:
        "GroundWork sites are built for local search from day one — with structured data, service area pages, and Google Business integration. Show up for the high-intent searches that drive real revenue.",
    },
    {
      icon: "📋",
      title: "Service request forms for estimates",
      description:
        "Homeowners and businesses can request a service call or free estimate directly from your site. All details land in your inbox instantly — no more missed inquiry emails.",
    },
    {
      icon: "⭐",
      title: "Collect reviews after every job",
      description:
        "Build local SEO trust with customer testimonials displayed prominently on your site. When homeowners compare HVAC companies, reviews and social proof help you stand out.",
    },
  ],
  testimonial: {
    name: "Tom H.",
    initials: "TH",
    business: "H&H Heating & Cooling",
    quote:
      "We had a basic site that hadn't been touched in 5 years. Switched to GroundWork and within the first month we were getting calls from people who found us on Google search — something that never happened before.",
    color: "from-orange-500 to-red-600",
  },
  faqs: [
    {
      question: "What HVAC services can I list on my website?",
      answer:
        "Any services you offer — AC repair and installation, furnace and boiler repair, heat pump installation, duct cleaning, seasonal tune-ups, emergency HVAC, commercial HVAC. GroundWork lets you list and describe all of them clearly.",
    },
    {
      question: "Will my HVAC website show up for emergency searches?",
      answer:
        "GroundWork sites include local SEO that helps you rank for high-intent searches like 'emergency AC repair near me', 'furnace repair [city]', and 'HVAC company [city]'. We handle all the technical SEO automatically.",
    },
    {
      question: "Can I add my service area to my website?",
      answer:
        "Yes. You can list all the cities, towns, and neighbourhoods you serve. This helps both customers understand your coverage and Google understand where to show your site in search results.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "14 days of full access, no credit card required. Your site goes live immediately, so you can start capturing leads during your trial. After the trial, plans start at $39/month.",
    },
  ],
  blogPost: {
    href: "/blog/best-website-for-hvac-companies",
    title: "The Best Website for HVAC Companies in 2026",
  },
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/hvac`,
    siteName: "GroundWork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function HvacPage() {
  return <IndustryLandingPage data={data} />;
}
