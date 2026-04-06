import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Versa — Websites & Marketing for Local Businesses",
    template: "%s | Versa",
  },
  description:
    "Versa helps local service businesses get a professional website live in under an hour — with contact forms, Google discovery tools, and email marketing. No tech skills needed.",
  keywords: [
    "small business website builder",
    "local business website",
    "service business marketing",
    "plumber website",
    "landscaper website",
    "cleaning business website",
    "local SEO",
  ],
  openGraph: {
    title: "Versa — Websites & Marketing for Local Businesses",
    description:
      "Versa helps local service businesses get a professional website live in under an hour. No tech skills needed.",
    type: "website",
    siteName: "Versa",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Versa — Websites & Marketing for Local Businesses",
    description:
      "Versa helps local service businesses get a professional website live in under an hour. No tech skills needed.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
