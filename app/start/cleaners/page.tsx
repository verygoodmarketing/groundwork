import type { Metadata } from "next";
import { ColdEmailLandingPage } from "@/components/landing/ColdEmailLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Website Platform for Cleaning Businesses — Get More Clients Online | GroundWork",
  description:
    "GroundWork helps cleaning businesses get a professional website live in under an hour — with built-in local SEO, lead capture, and online booking. $39/month. Free 14-day trial.",
  openGraph: {
    title: "Website Platform for Cleaning Businesses — Get More Clients Online | GroundWork",
    description:
      "Professional cleaning business website + lead capture + local SEO. Live in under an hour. Built specifically for cleaning services. $39/month. Free trial.",
    type: "website",
    url: `${APP_URL}/start/cleaners`,
    siteName: "GroundWork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GroundWork for Cleaning Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Platform for Cleaning Businesses | GroundWork",
    description:
      "Professional cleaning business website + lead capture + local SEO. $39/month. Free trial.",
    images: ["/og-image.png"],
  },
};

export default function CleanersStartPage() {
  return <ColdEmailLandingPage trade="cleaners" />;
}
