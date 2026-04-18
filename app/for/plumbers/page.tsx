import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

const data: IndustryPageData = {
  slug: "plumbers",
  pageTitle: "Website Builder for Plumbers — Get More Plumbing Jobs Online | GroundWork",
  metaDescription:
    "Get a professional plumber website live in under an hour. Built-in local SEO, lead capture, click-to-call, and Google review tools — designed for plumbing businesses. Free to try.",
  h1: "The Website Builder Made for Plumbers",
  heroSubcopy:
    "Get a professional plumbing website live in under an hour — with local SEO, contact forms, and click-to-call built in. No tech skills required.",
  industryLabel: "Plumber",
  painPoint:
    "When someone's pipes burst at 11pm, they search Google for the nearest plumber. If you don't have a website, they call your competitor.",
  Icon: Wrench,
  accentColor: "brand",
  trustSignals: [
    "Live in under an hour",
    "No code required",
    "Local SEO built in",
    "Free to try",
  ],
  features: [
    {
      icon: "📞",
      title: "Click-to-call on every page",
      description:
        "Mobile visitors can call you with one tap. Emergency plumbing calls convert instantly — don't make them hunt for your phone number.",
    },
    {
      icon: "📍",
      title: "Show up in 'plumber near me' searches",
      description:
        "GroundWork auto-generates local SEO metadata, sitemaps, and Google Business Profile integrations so you rank for the searches that matter — plumber near me, emergency plumber, drain repair.",
    },
    {
      icon: "📋",
      title: "Lead capture forms — 24/7",
      description:
        "Service request and quote forms that work while you're on a job. Every submission goes straight to your inbox so you never miss a lead.",
    },
    {
      icon: "⭐",
      title: "Automated review requests",
      description:
        "After every job, send a one-click review request. More Google reviews means higher rankings and more trust with new customers.",
    },
  ],
  testimonial: {
    name: "Mike D.",
    initials: "MD",
    business: "Delta Plumbing & Drain",
    quote:
      "I was skeptical because I'm not techy at all. But I had my site live in 40 minutes and booked my first online customer the same week. The click-to-call alone is worth it.",
    color: "from-blue-500 to-cyan-600",
  },
  faqs: [
    {
      question: "Do I need any tech skills to build a plumber website?",
      answer:
        "None at all. GroundWork walks you through every step — business name, phone, services, photos. If you can fill out a form, you can build a website with GroundWork.",
    },
    {
      question: "Will my plumbing website show up on Google?",
      answer:
        "Yes. GroundWork sites are built with local SEO from the ground up — proper meta tags, structured data, sitemap submission, and Google Business Profile integration. Most GroundWork plumber sites start appearing in local search within 2-4 weeks.",
    },
    {
      question: "What if I already have a website?",
      answer:
        "You can migrate to GroundWork easily. Many plumbers switch because their old site has no lead forms, no local SEO, and hasn't been updated in years. GroundWork gives you a modern site that actually converts visitors into calls.",
    },
    {
      question: "How much does it cost?",
      answer:
        "GroundWork starts at $39/month with a 14-day free trial — no credit card required to get started. You can cancel anytime. Most plumbers make back their monthly fee from just one new job.",
    },
  ],
  blogPost: {
    href: "/blog/best-website-for-plumbers",
    title: "The Best Website for Plumbers in 2026",
  },
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/plumbers`,
    siteName: "GroundWork",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function PlumbersPage() {
  return <IndustryLandingPage data={data} />;
}
