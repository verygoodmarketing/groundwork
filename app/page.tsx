import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Groundwork — Websites & Marketing for Local Service Businesses",
  description:
    "Groundwork helps plumbers, electricians, cleaners, and contractors get a professional website live in under an hour — with built-in local SEO, lead capture, email marketing, and review tools. Free to try.",
  openGraph: {
    title: "Groundwork — Get Found Online. Get More Customers.",
    description:
      "The all-in-one marketing platform for local service businesses. Website builder, local SEO, lead capture, review requests, and email marketing — in one simple tool.",
    type: "website",
    url: APP_URL,
    siteName: "Groundwork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Groundwork — Get Found Online. Get More Customers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Groundwork — Get Found Online. Get More Customers.",
    description:
      "The all-in-one marketing platform for local service businesses. Website builder, local SEO, lead capture, review requests, and email marketing — in one simple tool.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <LandingPage />;
}
