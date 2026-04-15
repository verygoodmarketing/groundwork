"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DEMO_BUSINESS,
  DEMO_SERVICES,
  DEMO_REVIEWS,
  DEMO_NAV_TABS,
  type DemoTab,
} from "@/components/demo/demoBusiness";

// ─── Star Rating ──────────────────────────────────────────────────────────────

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {STAR_INDICES.map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Site Preview Panels ──────────────────────────────────────────────────────

function HomePanel() {
  return (
    <div>
      {/* Hero */}
      <div
        className="rounded-xl px-6 py-10 mb-6 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)" }}
      >
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {DEMO_BUSINESS.name}
        </h1>
        <p className="text-blue-100 text-base mb-6">{DEMO_BUSINESS.slogan}</p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl opacity-90 cursor-default text-sm"
          title="Demo only — not functional"
        >
          Get a Free Quote
        </button>
        <p className="text-blue-200 text-xs mt-2">(Demo — button not active)</p>
      </div>

      {/* Services preview */}
      <div className="mb-6">
        <h2
          className="text-base font-bold text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our Services
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {DEMO_SERVICES.map((service) => (
            <div key={service.id} className="bg-blue-50 rounded-lg p-3 text-sm font-semibold text-blue-800">
              {service.name}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews preview */}
      <div>
        <h2
          className="text-base font-bold text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What Customers Say
        </h2>
        <div className="space-y-3">
          {DEMO_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <StarRating count={review.rating} />
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <p className="text-gray-400 text-xs mt-2">{review.author} &middot; {review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div>
      <div
        className="rounded-xl px-6 py-8 mb-6 text-white"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}
      >
        <h1
          className="text-2xl font-extrabold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About {DEMO_BUSINESS.name}
        </h1>
        <p className="text-blue-100 text-sm leading-relaxed">
          Serving the {DEMO_BUSINESS.city}, {DEMO_BUSINESS.state} area with professional plumbing services since 2004.
          Our team of licensed plumbers is committed to honest pricing, fast response, and lasting repairs.
        </p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg aria-hidden="true" className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Licensed & Insured — TX Plumbing Lic. #123456
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg aria-hidden="true" className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Available 24/7 for emergency calls
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg aria-hidden="true" className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Serving {DEMO_BUSINESS.city} and surrounding areas
        </div>
      </div>
    </div>
  );
}

function ServicesPanel() {
  return (
    <div>
      <h1
        className="text-xl font-extrabold text-gray-900 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Our Services
      </h1>
      <div className="space-y-4">
        {DEMO_SERVICES.map((service) => (
          <div key={service.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg aria-hidden="true" className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div>
      <h1
        className="text-xl font-extrabold text-gray-900 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Contact Us
      </h1>

      {/* Contact info */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg aria-hidden="true" className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-semibold text-gray-900">{DEMO_BUSINESS.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg aria-hidden="true" className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm font-semibold text-gray-900">{DEMO_BUSINESS.address}</p>
          </div>
        </div>
      </div>

      {/* Disabled contact form */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Send a Message</p>
        <div>
          <label htmlFor="demo-name" className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            id="demo-name"
            disabled
            aria-disabled="true"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
            placeholder="Your name"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="demo-message" className="block text-xs text-gray-500 mb-1">Message</label>
          <textarea
            id="demo-message"
            disabled
            aria-disabled="true"
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400 cursor-not-allowed resize-none"
            placeholder="How can we help?"
            readOnly
          />
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full bg-blue-600/50 text-white font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed"
          title="Demo only — not functional"
        >
          Send Message (Demo)
        </button>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-8 pt-6 border-t border-gray-100 text-center">
      <p className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>
        {DEMO_BUSINESS.name}
      </p>
      <p className="text-gray-400 text-xs">{DEMO_BUSINESS.address}</p>
      <p className="text-gray-400 text-xs mt-0.5">{DEMO_BUSINESS.phone}</p>
      <p className="text-gray-300 text-xs mt-3">
        &copy; {new Date().getFullYear()} {DEMO_BUSINESS.name}. All rights reserved.
      </p>
    </footer>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DemoSitePreview() {
  const [activeTab, setActiveTab] = useState<DemoTab>("Home");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Sticky Demo Banner */}
      <div className="sticky top-0 z-50 bg-amber-500 text-white px-4 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-medium shadow-md">
        <span>This is a live demo — your real site will use your own business info.</span>
        <Link
          href="/onboarding/step-1"
          className="bg-white text-amber-700 font-bold px-3 py-1 rounded-lg text-xs hover:bg-amber-50 transition-colors whitespace-nowrap"
        >
          Start free trial →
        </Link>
      </div>

      {/* 2. Simulated Dashboard Header */}
      <div
        className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* GroundWork branding */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 00-2 2v4a2 2 0 002 2h8a2 2 0 002-2v-4a2 2 0 00-2-2H6zm1 2a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-400 hidden sm:block">GroundWork</span>
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>
                {DEMO_BUSINESS.name}
              </span>
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {DEMO_BUSINESS.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-200">
              {DEMO_BUSINESS.subscriptionStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Page Toggle Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Website pages">
            {DEMO_NAV_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`panel-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Site Preview Panel */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Browser frame container */}
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 bg-white">
            {/* Browser chrome */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 text-center truncate">
                  aceplumbing.groundworklocal.com
                </div>
              </div>
            </div>
            {/* Page content */}
            <div
              id={`panel-${activeTab.toLowerCase()}`}
              role="tabpanel"
              aria-label={`${activeTab} page`}
              className="p-5 sm:p-8 bg-gray-50 min-h-[500px]"
            >
              {activeTab === "Home" && <HomePanel />}
              {activeTab === "About" && <AboutPanel />}
              {activeTab === "Services" && <ServicesPanel />}
              {activeTab === "Contact" && <ContactPanel />}
              <SiteFooter />
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            This is a simulated preview. Your real GroundWork site will have your own business data, photos, and custom domain.
          </p>
        </div>
      </div>

      {/* 5. Bottom CTA Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link
            href="/onboarding/step-1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-bold text-base px-8 py-3.5 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25 active:scale-95"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start your free trial — it&apos;s free
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/onboarding/step-1?mode=signin"
            className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
