import Link from "next/link";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComparisonRow {
  feature: string;
  groundwork: string; // text, may include ✅ ❌ ⚠️
  competitor: string;
}

export interface BenefitSection {
  number: string;
  title: string;
  body: string;
}

export interface ComparisonPageData {
  /** URL slug, e.g. "wix" */
  slug: string;
  /** Page <title> tag */
  pageTitle: string;
  /** Meta description */
  metaDescription: string;
  /** H1 */
  h1: string;
  /** Intro paragraph below H1 */
  intro: string;
  /** Comparison table rows */
  tableRows: ComparisonRow[];
  /** 5 benefit sections (why Groundwork wins) */
  benefits: BenefitSection[];
  /** "Who should use X" section */
  whoShouldUse: {
    heading: string;
    body: string;
  };
  /** Bottom-line paragraph */
  bottomLine: string;
  /** CTA button text */
  ctaText: string;
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
      <span
        className="text-brand-700 text-sm font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        V
      </span>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span
              className="text-xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Groundwork
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/onboarding/step-1?mode=signin"
              className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/onboarding/step-1"
              className="bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors shadow-[0_0_16px_rgba(22,163,74,0.35)]"
            >
              Get started free
            </Link>
          </div>
          {/* Mobile CTA only */}
          <Link
            href="/onboarding/step-1"
            className="md:hidden bg-brand-600 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ data }: { data: ComparisonPageData }) {
  return (
    <section
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24"
      style={{
        background:
          "linear-gradient(135deg, #0d1117 0%, #111827 40%, #0d1117 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl -translate-y-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl translate-y-1/3"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-brand-500/15 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 ring-1 ring-brand-500/30">
          Comparison
        </div>

        <h1
          className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] mb-6"
          style={{ letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}
        >
          {data.h1}
        </h1>

        <div className="text-xl text-[#c9d1d9] mb-10 leading-relaxed max-w-2xl mx-auto space-y-4">
          {data.intro.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {data.ctaText}
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
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

function ComparisonTable({
  data,
  competitorName,
}: {
  data: ComparisonPageData;
  competitorName: string;
}) {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            Feature Comparison
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Groundwork vs {competitorName}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/2">
                  Feature
                </th>
                <th className="px-6 py-4 font-semibold text-brand-700 text-center">
                  Groundwork
                </th>
                <th className="px-6 py-4 font-semibold text-gray-500 text-center">
                  {competitorName}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-gray-100 last:border-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-800">
                    {row.groundwork}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────

function BenefitsSection({
  data,
  competitorName,
}: {
  data: ComparisonPageData;
  competitorName: string;
}) {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(160deg, #0d1117 0%, #161b22 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-300 mb-3">
            Why Groundwork Wins
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            5 Reasons Local Service Businesses Choose Groundwork Over{" "}
            {competitorName}
          </h2>
        </div>

        <div className="space-y-8">
          {data.benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="bg-white/5 rounded-2xl p-8 ring-1 ring-white/10"
            >
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {benefit.number}. {benefit.title}
              </h3>
              <p className="text-[#c9d1d9] leading-relaxed">{benefit.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who Should Use ───────────────────────────────────────────────────────────

function WhoShouldUseSection({ data }: { data: ComparisonPageData }) {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {data.whoShouldUse.heading}
        </h2>
        <div className="text-gray-600 leading-relaxed text-lg space-y-4">
          {data.whoShouldUse.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bottom Line CTA ──────────────────────────────────────────────────────────

function BottomLineCTA({ data }: { data: ComparisonPageData }) {
  return (
    <section
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, #0d1117 0%, #14532d 55%, #166534 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-64 h-64 bg-brand-300/20 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl"
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Bottom Line
        </h2>
        <div className="text-lg text-brand-100 mb-10 leading-relaxed space-y-4">
          {data.bottomLine.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {data.ctaText}
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
        <p className="text-xs text-brand-200/80 mt-5">
          Free for 14 days. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0d1117] text-gray-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span
            className="text-white font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Groundwork
          </span>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link href="/" className="hover:text-brand-400 transition-colors">
            Home
          </Link>
          <Link
            href="/pricing"
            className="hover:text-brand-400 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#features"
            className="hover:text-brand-400 transition-colors"
          >
            Features
          </Link>
          <Link href="/blog" className="hover:text-brand-400 transition-colors">
            Blog
          </Link>
          <Link
            href="/onboarding/step-1"
            className="hover:text-brand-400 transition-colors"
          >
            Get started
          </Link>
        </div>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Groundwork. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function JsonLd({
  data,
}: {
  data: ComparisonPageData;
  competitorName?: string;
}) {
  const pageUrl = `${APP_URL}/vs/${data.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.pageTitle,
    description: data.metaDescription,
    url: pageUrl,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Groundwork",
    applicationCategory: "BusinessApplication",
    description:
      "Website and marketing platform built for local service businesses",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Free Trial",
        price: "0",
        priceCurrency: "USD",
        description: "14-day free trial, no credit card required",
      },
      {
        "@type": "Offer",
        name: "Starter",
        price: "39",
        priceCurrency: "USD",
        billingIncrement: "P1M",
      },
    ],
    url: APP_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export function ComparisonPage({
  data,
  competitorName,
}: {
  data: ComparisonPageData;
  competitorName: string;
}) {
  return (
    <>
      <JsonLd data={data} competitorName={competitorName} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection data={data} />
          <ComparisonTable data={data} competitorName={competitorName} />
          <BenefitsSection data={data} competitorName={competitorName} />
          <WhoShouldUseSection data={data} />
          <BottomLineCTA data={data} />
        </main>
        <Footer />
      </div>
    </>
  );
}
