import type { Metadata } from "next";
import { DemoSitePreview } from "@/components/demo/DemoSitePreview";

export const metadata: Metadata = {
  title: "Live Demo — See Your GroundWork Site in Action",
  description:
    "Try GroundWork for free — see how your plumbing, cleaning, or contractor website looks before you sign up. Interactive demo, no account required.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Live Demo — See Your GroundWork Site in Action",
    description:
      "Try GroundWork before you sign up. See a simulated plumbing business website — built with GroundWork in under an hour.",
    type: "website",
  },
};

// No auth required — this route is intentionally public.
// The Supabase auth middleware only protects /dashboard and /onboarding routes
// (there is no middleware.ts matcher covering /demo).

export default function DemoPage() {
  return <DemoSitePreview />;
}
