import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: IndustryPageData = {
  slug: "cleaners",
  pageTitle: "Website for Cleaning Businesses — Get More Cleaning Clients Online | GroundWork",
  metaDescription:
    "Build a professional cleaning business website in under an hour. Attract residential and commercial clients with local SEO and booking forms. Free to try.",
  h1: "Grow Your Cleaning Business Online",
  heroSubcopy:
    "A professional cleaning website that captures leads, builds trust, and gets you found in local search — all built in under an hour without any tech skills.",
  industryLabel: "Cleaning Business",
  painPoint:
    "Word-of-mouth only goes so far. To keep growing, you need to be found by the people in your area searching for cleaning services right now.",
  Icon: Sparkles,
  accentColor: "brand",
  trustSignals: [
    "Booking & quote forms",
    "Before/after galleries",
    "Local SEO built in",
    "Free to try",
  ],
  features: [
    {
      icon: "🧹",
      title: "Service menus for every cleaning type",
      description:
        "List your services clearly — residential cleaning, deep cleaning, move-out cleaning, commercial, Airbnb turnover. Customers find exactly what they need and contact you directly.",
    },
    {
      icon: "📅",
      title: "Booking & quote request forms",
      description:
        "Let customers request a quote or book a clean right from your website. Every submission comes to your inbox with all the details — no more missed calls or back-and-forth texts.",
    },
    {
      icon: "📍",
      title: "Rank for 'house cleaners near me'",
      description:
        "GroundWork sites are optimized for local search from day one — so you show up when people search for cleaning services in your city or neighbourhood.",
    },
  ],
  testimonial: {
    name: "Maria T.",
    initials: "MT",
    business: "Spotless Cleaning Co.",
    quote:
      "I had no website for 6 years. I built mine on GroundWork in 45 minutes and got my first online lead within a week. Now I get 3-4 new bookings per month from people who found me on Google.",
    color: "from-violet-500 to-purple-600",
  },
  faqs: [
    {
      question: "Can I show different cleaning service packages on my website?",
      answer:
        "Yes. GroundWork lets you list all your services — standard cleaning, deep cleaning, move-out, commercial, and more — with descriptions and pricing. You can also show pricing tiers or leave a 'get a quote' option.",
    },
    {
      question: "How do I showcase my work and build trust with new clients?",
      answer:
        "GroundWork makes it easy to add before/after photos, client testimonials, and service descriptions. A strong visual portfolio combined with your professional site helps convert visitors into bookings.",
    },
    {
      question: "I only clean in specific neighbourhoods — can my website reflect that?",
      answer:
        "Yes. You can list your service areas on your website and GroundWork's local SEO tools help you rank for searches in those specific areas, not just generic city-wide searches.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "Full access to all features for 14 days. No credit card required. You'll have a live website, lead forms, and local SEO active from day one of your trial.",
    },
  ],
  blogPost: {
    href: "/blog/best-website-for-cleaning-businesses",
    title: "The Best Website for Cleaning Businesses in 2026",
  },
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/cleaners`,
    siteName: "GroundWork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function CleanersPage() {
  return <IndustryLandingPage data={data} />;
}
