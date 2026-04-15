// Static demo business data — Ace Plumbing (Austin, TX)
// Used by DemoSitePreview and app/demo/page.tsx
// No DB reads, no auth required.

export const DEMO_BUSINESS = {
  name: "Ace Plumbing",
  city: "Austin",
  state: "TX",
  phone: "(512) 555-0182",
  category: "Plumbing",
  slogan: "Fast, Reliable Plumbing You Can Trust",
  address: "1204 Barton Springs Rd, Austin, TX 78704",
  email: "info@aceplumbing.example",
  templateStyle: "plumbers-v1",
  accentColor: "#3b82f6",
  subscriptionStatus: "Free Trial",
} as const;

export const DEMO_SERVICES = [
  { id: "drain", name: "Drain Cleaning", description: "Clear clogs fast with our professional drain cleaning service — residential and commercial." },
  { id: "water-heater", name: "Water Heater Repair", description: "Expert repair and replacement for all water heater brands. Same-day service available." },
  { id: "leak", name: "Leak Detection", description: "Non-invasive leak detection technology to find hidden leaks before they become expensive disasters." },
  { id: "emergency", name: "Emergency Plumbing", description: "24/7 emergency plumbing response. When you need us most, we show up — fast." },
] as const;

export const DEMO_REVIEWS = [
  {
    id: "r1",
    author: "James M.",
    rating: 5,
    text: "Ace Plumbing fixed our burst pipe within 2 hours of calling. Incredibly professional and fair pricing. Will never use anyone else.",
    date: "March 2025",
  },
  {
    id: "r2",
    author: "Linda H.",
    rating: 5,
    text: "Called them for a water heater emergency on a Sunday — they came out the same day, no extra charge. Highly recommend!",
    date: "February 2025",
  },
  {
    id: "r3",
    author: "Carlos R.",
    rating: 5,
    text: "Very thorough with the drain cleaning job. Explained everything clearly and didn't try to upsell me on things I didn't need.",
    date: "January 2025",
  },
] as const;

export const DEMO_NAV_TABS = ["Home", "About", "Services", "Contact"] as const;
export type DemoTab = (typeof DEMO_NAV_TABS)[number];
