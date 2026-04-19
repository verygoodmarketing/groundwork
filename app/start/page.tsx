import type { Metadata } from "next";
import { ColdEmailLandingPage } from "@/components/landing/ColdEmailLandingPage";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Get Found Online. Win More Customers. | GroundWork",
  description:
    "GroundWork is a website platform built specifically for local service businesses — plumbers, electricians, cleaners, and contractors. Live in under an hour. $39/month. Free 14-day trial.",
  openGraph: {
    title: "Get Found Online. Win More Customers. | GroundWork",
    description:
      "Professional website + lead capture + local SEO for local service businesses. Built for plumbers, electricians, cleaners, and contractors. $39/month. Free trial.",
    type: "website",
    url: `${APP_URL}/start`,
    siteName: "GroundWork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GroundWork — Get Found Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Found Online. Win More Customers. | GroundWork",
    description:
      "Professional website + lead capture + local SEO for local service businesses. $39/month. Free 14-day trial.",
    images: ["/og-image.png"],
  },
};

export default function StartPage() {
  return <ColdEmailLandingPage />;
}
