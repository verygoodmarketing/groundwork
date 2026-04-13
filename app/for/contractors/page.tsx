import type { Metadata } from "next";
import { HardHat } from "lucide-react";
import { IndustryLandingPage, type IndustryPageData } from "@/components/for/IndustryLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://versa-kohl.vercel.app";

const data: IndustryPageData = {
  slug: "contractors",
  pageTitle: "Website for General Contractors — Win More Construction Jobs Online | Versa",
  metaDescription:
    "Build a professional contractor website in under an hour. Show your project portfolio, capture leads, and rank for construction and remodeling services in your area. Free to try.",
  h1: "The Website Builder for General Contractors",
  heroSubcopy:
    "Build a professional contractor website in under an hour — with project photos, lead capture, and local SEO so you win more jobs.",
  industryLabel: "Contractor",
  painPoint:
    "Big jobs require big trust. Before homeowners sign a contract, they research contractors online. If you don't have a professional website with project photos and reviews, you lose before you even quote.",
  Icon: HardHat,
  accentColor: "brand",
  trustSignals: [
    "Project photo galleries",
    "Quote request forms",
    "License & insurance display",
    "Free to try",
  ],
  features: [
    {
      icon: "🏗️",
      title: "Project portfolio that wins jobs",
      description:
        "Show before-and-after photos of completed projects. A strong portfolio is your most powerful sales tool — it proves your quality before the customer ever calls.",
    },
    {
      icon: "📜",
      title: "Display your license, insurance, and credentials",
      description:
        "Prominently showcase your contractor license, insurance certificates, and bonding. The contractors who look most trustworthy online win the most bids.",
    },
    {
      icon: "📋",
      title: "Quote and estimate request forms",
      description:
        "Let prospects request a quote directly from your site with job type, location, and timeline already filled in. Follow up faster and close more jobs.",
    },
    {
      icon: "📍",
      title: "Rank for contractor and remodeling searches",
      description:
        "Versa sites are optimized for local SEO — so you show up when homeowners and developers search for general contractors, remodelers, or construction companies in your area.",
    },
  ],
  testimonial: {
    name: "Carlos M.",
    initials: "CM",
    business: "Masuda Construction",
    quote:
      "We were getting all our work from referrals, which was great but unpredictable. After launching on Versa, we started getting RFQs from homeowners who found us on Google. Filled our pipeline for the whole season.",
    color: "from-stone-500 to-zinc-600",
  },
  faqs: [
    {
      question: "Can I show photos of my past construction and remodeling projects?",
      answer:
        "Absolutely. Versa has a full-featured project portfolio gallery. You can organize photos by project type — kitchen remodels, additions, new construction, commercial buildouts — and add descriptions to tell the story of each job.",
    },
    {
      question: "Will my contractor website show up in local searches?",
      answer:
        "Yes. Versa builds local SEO into every site — helping you rank for searches like 'general contractor near me', 'home remodeling [city]', 'construction company [city]', and similar terms. Structured data and Google Business integration are included.",
    },
    {
      question: "Can I show my contractor license and insurance on the site?",
      answer:
        "Yes, and we strongly recommend it. Displaying your license number, insurance, and bonding information is one of the most effective ways to build trust with homeowners and win bids over competitors who don't.",
    },
    {
      question: "How do I get started?",
      answer:
        "Click 'Get started free' above. You'll pick a template, enter your business info, upload some project photos, and go live — all in under an hour. No credit card needed for the 14-day trial.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.pageTitle,
    description: data.metaDescription,
    type: "website",
    url: `${APP_URL}/for/contractors`,
    siteName: "Versa",
  },
  twitter: {
    card: "summary_large_image",
    title: data.pageTitle,
    description: data.metaDescription,
  },
};

export default function ContractorsPage() {
  return <IndustryLandingPage data={data} />;
}
