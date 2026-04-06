import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Versa — Your Website. Your Customers. Your Growth.",
  description:
    "Versa helps local service businesses get a professional website live in under an hour — with built-in contact forms, Google discovery tools, and email marketing. No tech skills needed.",
  openGraph: {
    title: "Versa — Your Website. Your Customers. Your Growth.",
    description:
      "Versa helps local service businesses get a professional website live in under an hour — with built-in contact forms, Google discovery tools, and email marketing. No tech skills needed.",
    type: "website",
    siteName: "Versa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Versa — Your Website. Your Customers. Your Growth.",
    description:
      "Versa helps local service businesses get a professional website live in under an hour — with built-in contact forms, Google discovery tools, and email marketing. No tech skills needed.",
  },
};

export default function Home() {
  return <LandingPage />;
}
