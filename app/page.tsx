import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { PreLaunchPage } from "@/components/pre-launch/PreLaunchPage";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "GroundWork — Get Found Online, Win More Customers",
  description:
    "Stop losing jobs to competitors with better websites. GroundWork helps plumbers, electricians, HVAC, cleaners, and contractors win more customers — with a professional website, Google rankings, and 24/7 lead capture. Live in 48 hours. Free to try.",
  openGraph: {
    title: "GroundWork — Get Found Online. Win More Customers.",
    description:
      "Stop losing jobs to competitors with better websites. Get your business online, start ranking on Google, and capture leads 24/7 — in under an hour.",
    type: "website",
    url: APP_URL,
    siteName: "GroundWork",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GroundWork — Get Found Online. Win More Customers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GroundWork — Get Found Online. Win More Customers.",
    description:
      "Stop losing jobs to competitors with better websites. Get your business online, start ranking on Google, and capture leads 24/7 — in under an hour.",
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
