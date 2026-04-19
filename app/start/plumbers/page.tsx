import type { Metadata } from "next";
import { ColdEmailLandingPage } from "@/components/landing/ColdEmailLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Website Platform for Plumbers — Get More Plumbing Jobs Online | GroundWork",
  description:
    "GroundWork helps plumbers get a professional website live in under an hour — with built-in local SEO, lead capture, and click-to-call. $39/month. Free 14-day trial.",
  openGraph: {
    title: "Website Platform for Plumbers — Get More Plumbing Jobs Online | GroundWork",
    description:
      "Professional plumber website + lead capture + local SEO. Live in under an hour. Built specifically for plumbing businesses. $39/month. Free trial.",
    type: "website",
    url: `${APP_URL}/start/plumbers`,
    siteName: "GroundWork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GroundWork for Plumbers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Platform for Plumbers | GroundWork",
    description:
      "Professional plumber website + lead capture + local SEO. $39/month. Free trial.",
    images: ["/og-image.png"],
  },
};

export default function PlumbersStartPage() {
  return <ColdEmailLandingPage trade="plumbers" />;
}
