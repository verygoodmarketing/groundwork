import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { PreLaunchPage } from "@/components/pre-launch/PreLaunchPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "GroundWork — Websites & Marketing for Local Service Businesses",
  description:
    "GroundWork helps plumbers, electricians, cleaners, and contractors get a professional website live in under an hour — with built-in local SEO, lead capture, email marketing, and review tools. Free to try.",
  openGraph: {
    title: "GroundWork — Get Found Online. Get More Customers.",
    description:
      "The all-in-one marketing platform for local service businesses. Website builder, local SEO, lead capture, review requests, and email marketing — in one simple tool.",
    type: "website",
    url: APP_URL,
    siteName: "GroundWork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GroundWork — Get Found Online. Get More Customers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GroundWork — Get Found Online. Get More Customers.",
    description:
      "The all-in-one marketing platform for local service businesses. Website builder, local SEO, lead capture, review requests, and email marketing — in one simple tool.",
    images: ["/og-image.png"],
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  if (process.env.PRE_LAUNCH_MODE === "true") {
    return <PreLaunchPage />;
  }
  return <LandingPage />;
}
