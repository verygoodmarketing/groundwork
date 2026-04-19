import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: IndustryPageData = {
  slug: "landscapers",
  pageTitle: "Website Builder for Landscapers — Win More Lawn & Landscaping Jobs | GroundWork",
  metaDescription:
    "Get a professional landscaping website live in under an hour. Show off your work with a photo gallery, capture quote requests, and rank in local search. Free to try.",
  h1: "The Website Builder Made for Landscapers",
  heroSubcopy:
    "Showcase your best work, capture quote requests, and rank locally — all with a professional landscaping website you can build in under an hour.",
  industryLabel: "Landscaper",
  painPoint:
    "Seasonal work means short windows. Every lead you miss during spring and summer is revenue lost for the whole year. A great website runs 24/7 so you don't miss any.",
  Icon: Leaf,
  accentColor: "brand",
  trustSignals: [
    "Beautiful photo galleries",
    "Quote request forms",
    "Local SEO built in",
    "Free to try",
  ],
  features: [
    {
      icon: "📸",
      title: "Show off your work with photo galleries",
      description:
        "Before-and-after galleries let your best projects sell for you. Upload photos from your phone and showcase the transformations customers actually care about.",
    },
    {
      icon: "📋",
      title: "Quote request forms that convert",
      description:
        "Visitors can request a quote in seconds. Forms auto-notify you by email and capture all the details you need: property size, service type, timeline.",
    },
    {
      icon: "📍",
      title: "Rank for 'landscapers near me'",
      description:
        "GroundWork builds local SEO into every page — structured data, service area pages, and Google Business integration so you show up when homeowners search for landscapers in your area.",
    },
  ],
  testimonial: {
    name: "Dave R.",
    initials: "DR",
    business: "Ridge Line Landscaping",
    quote:
      "My old website was from 2015. GroundWork made it stupid easy to get a new one up that actually looks professional. Customers tell me all the time it was what made them choose us.",
    color: "from-emerald-500 to-teal-600",
  },
  faqs: [
    {
      question: "Can I add photos of my landscaping work to my website?",
      answer:
        "Absolutely. GroundWork has a built-in photo gallery that's perfect for landscaping before-and-afters, seasonal projects, and portfolio work. You can upload from your phone in seconds.",
    },
    {
      question: "Will my landscaping business show up in local Google searches?",
      answer:
        "Yes. GroundWork sites include local SEO tooling that helps you rank for searches like 'landscapers near me', 'lawn care [city]', and 'landscaping company [city]'. We handle the technical SEO so you don't have to.",
    },
    {
      question: "Can I use GroundWork seasonally?",
      answer:
        "Yes, you can cancel anytime. Many landscapers run GroundWork during peak season and pause during winter. You keep your domain and content no matter what.",
    },
    {
      question: "How do quote requests work?",
      answer:
        "Visitors fill out a form on your site describing the job. You get an email instantly with their contact info and job details. No third-party tools or add-ons needed.",
    },
  ],
  blogPost: {
    href: "/blog/best-website-for-landscapers",
    title: "The Best Website for Landscapers in 2026",
  },
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/landscapers`,
    siteName: "GroundWork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function LandscapersPage() {
  return <IndustryLandingPage data={data} />;
}
