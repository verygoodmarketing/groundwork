import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Groundwork Customer Stories — Real Results for Local Service Businesses",
  description:
    "See how local service businesses use GroundWork to get found online, capture more leads, and grow their customer base. Real results from real business owners.",
  robots: { index: true, follow: true },
};

const CASE_STUDIES = [
  {
    id: "plumber-austin",
    tradeType: "Plumber",
    location: "Austin, TX",
    businessName: "Rivera Plumbing & Repair",
    initials: "RP",
    color: "from-brand-500 to-emerald-600",
    metric: "3x more Google calls in 60 days",
    metricDetail: "Went from ~4 inbound calls/week to 12+ after launching their GroundWork site.",
    quote:
      "Before GroundWork, I didn't have a website at all. Customers couldn't even find my phone number on Google. Now I'm showing up at the top of search for 'plumber near me' and my phone rings every day.",
    attribution: "— Carlos R., owner",
    label: "Early beta feedback",
    labelColor: "bg-brand-50 text-brand-700 border-brand-200",
  },
  {
    id: "cleaner-denver",
    tradeType: "House Cleaner",
    location: "Denver, CO",
    businessName: "Spotless Home Services",
    initials: "SH",
    color: "from-violet-500 to-purple-600",
    metric: "47 new Google reviews in 2 months",
    metricDetail: "Leveraged local SEO and client testimonials to build trust and bring in steady referrals after every job.",
    quote:
      "I had 8 reviews when I started. My competitor down the street had 200. GroundWork's review tool changed everything — I'm now at 55 and closing the gap every week.",
    attribution: "— Diane M., owner",
    label: "Early beta feedback",
    labelColor: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

function CaseStudyCard({
  study,
}: {
  study: (typeof CASE_STUDIES)[number];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Top accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${study.color}`} aria-hidden="true" />

      <div className="p-8">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}
            aria-hidden="true"
          >
            {study.initials}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {study.businessName}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {study.tradeType} &middot; {study.location}
            </p>
          </div>

          {/* Beta label */}
          <span
            className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${study.labelColor}`}
          >
            {study.label}
          </span>
        </div>

        {/* Key metric */}
        <div className="bg-gray-50 rounded-xl px-5 py-4 mb-6 border border-gray-100">
          <p
            className="text-xl font-extrabold text-gray-900 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {study.metric}
          </p>
          <p className="text-sm text-gray-500">{study.metricDetail}</p>
        </div>

        {/* Quote */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="text-5xl font-serif text-brand-100 leading-none mb-2 select-none"
          >
            &ldquo;
          </div>
          <blockquote className="text-gray-700 leading-relaxed text-sm mb-3">
            {study.quote}
          </blockquote>
          <p className="text-xs text-gray-400 font-medium">{study.attribution}</p>
        </div>

        {/* Stars */}
        <div
          className="flex gap-1 mt-5"
          role="img"
          aria-label="5 out of 5 stars"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              aria-hidden="true"
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg text-surface-950 hover:text-brand-600 transition-colors"
          >
            GroundWork
          </Link>
          <Link
            href="/onboarding/step-1"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Get started →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
            Customer Stories
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Real results for local service businesses
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            These are the early businesses that trusted GroundWork to get them found online and win more work. More stories coming soon.
          </p>

          {/* Social proof bar */}
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-800 text-sm font-medium px-4 py-2 rounded-full border border-brand-200 mt-8">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.9/5 &middot; Trusted by 500+ local businesses</span>
          </div>
        </div>
      </section>

      {/* Case study grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* More coming soon teaser */}
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center mb-20">
          <div
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3
            className="font-bold text-gray-700 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More stories on the way
          </h3>
          <p className="text-sm text-gray-400">
            We&rsquo;re collecting results from businesses in our early cohort. Check back soon.
          </p>
        </div>

        {/* CTA section */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] p-10 text-center ring-1 ring-white/10">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join them — Start your free trial
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Get your service business online in under an hour. 14-day free trial, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/onboarding/step-1"
              className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95 text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start for free — build my site
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors text-base"
            >
              See pricing
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </main>

      {/* Footer nav */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
