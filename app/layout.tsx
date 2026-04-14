import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";
import { Analytics } from "@vercel/analytics/react";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-brand",
  display: "swap",
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Groundwork — Websites & Marketing for Local Service Businesses",
    template: "%s | Groundwork",
  },
  description:
    "Groundwork helps plumbers, electricians, cleaners, and contractors get a professional website live in under an hour — with built-in local SEO, lead capture, email marketing, and review tools. Free to try.",
  keywords: [
    "website builder for small businesses",
    "local SEO for service businesses",
    "website for plumbers",
    "website for electricians",
    "marketing tools for small service businesses",
    "email marketing for small businesses",
    "Google review request tool",
    "website builder for contractors",
    "local business website",
    "service business marketing",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Groundwork — Get Found Online. Get More Customers.",
    description:
      "The all-in-one marketing platform for local service businesses. Website builder, local SEO, lead capture, review requests, and email marketing — in one simple tool.",
    type: "website",
    url: APP_URL,
    siteName: "Groundwork",
    locale: "en_US",
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
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Groundwork",
  description: "All-in-one marketing platform for local service businesses",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: APP_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to try",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TRPCProvider>{children}</TRPCProvider>
        <Analytics />
      </body>
    </html>
  );
}
