import Link from "next/link";
import { type LucideIcon } from "lucide-react";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

function JsonLd({ data }: { data: IndustryPageData }) {
  const pageUrl = `${APP_URL}/for/${data.slug}`;

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Groundwork",
    applicationCategory: "BusinessApplication",
    description: `Professional website builder for ${data.industryLabel.toLowerCase()}s`,
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
        name: "Paid Plan",
        price: "49",
        priceCurrency: "USD",
        billingIncrement: "P1M",
        description: "Full access to all Groundwork features",
      },
    ],
    url: APP_URL,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.pageTitle,
    description: data.metaDescription,
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IndustryFeature {
  icon: string; // emoji or short text
  title: string;
  description: string;
}

export interface IndustryTestimonial {
  name: string;
  initials: string;
  business: string;
  quote: string;
  color: string; // tailwind gradient classes
}

export interface IndustryPageData {
  /** URL slug, e.g. "plumbers" */
  slug: string;
  /** Page <title> */
  pageTitle: string;
  /** Meta description */
  metaDescription: string;
  /** Hero H1 */
  h1: string;
  /** Hero sub-copy */
  heroSubcopy: string;
  /** Short industry label, e.g. "Plumbing Business" */
  industryLabel: string;
  /** Pain-point sentence shown under h1 */
  painPoint: string;
  /** Lucide icon component for industry */
  Icon: LucideIcon;
  /** Accent color key for the hero badge */
  accentColor: string; // tailwind color class prefix (brand, blue, violet, etc.)
  /** List of 3-4 industry-specific features */
  features: IndustryFeature[];
  /** Testimonial for this vertical */
  testimonial: IndustryTestimonial;
  /** FAQ items */
  faqs: { question: string; answer: string }[];
  /** Keywords banner items */
  trustSignals: string[];
  /** Optional link to the corresponding blog post */
  blogPost?: { href: string; title: string };
}

// ─── Logo Mark (shared) ───────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-brand-700 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
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
            <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Groundwork
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Pricing</Link>
            <Link href="/onboarding/step-1?mode=signin" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Sign in</Link>
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

function HeroSection({ data }: { data: IndustryPageData }) {
  const { Icon } = data;
  return (
    <section
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #111827 40%, #0d1117 100%)" }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div aria-hidden="true" className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl translate-y-1/3" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-500/15 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 ring-1 ring-brand-500/30">
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {data.industryLabel}
        </div>

        <h1
          className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] mb-6"
          style={{ letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}
        >
          {data.h1}
        </h1>

        <p className="text-xl text-[#c9d1d9] mb-4 leading-relaxed max-w-2xl mx-auto">
          {data.heroSubcopy}
        </p>

        <p className="text-base text-[#8b949e] mb-10 max-w-xl mx-auto">
          {data.painPoint}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/onboarding/step-1"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get started free
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
          >
            See pricing
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
          {data.trustSignals.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg aria-hidden="true" className="w-4 h-4 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection({ data }: { data: IndustryPageData }) {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            Built for {data.industryLabel}s
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Everything your {data.industryLabel.toLowerCase()} business needs online
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Groundwork gives you the tools that actually matter for winning more local customers — without the complexity or the cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl p-7 bg-white border border-gray-100 border-l-4 border-l-brand-500 hover:border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-200"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection({ data }: { data: IndustryPageData }) {
  const steps = [
    {
      step: "01",
      title: "Pick your template",
      description: `Choose from templates designed specifically for ${data.industryLabel.toLowerCase()} businesses. Looks professional from day one.`,
    },
    {
      step: "02",
      title: "Add your business info",
      description: "Enter your name, phone, services, and photos. The whole setup takes about 20 minutes.",
    },
    {
      step: "03",
      title: "Go live & get found",
      description: "We provision your domain, submit to Google, and your site is live. Customers can find you right away.",
    },
  ];

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(160deg, #0d1117 0%, #161b22 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-300 mb-3">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Online in 3 simple steps
          </h2>
          <p className="text-lg text-[#c9d1d9]">No tech skills needed. No agencies. No waiting weeks.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.step} className="bg-white/5 rounded-2xl p-8 ring-1 ring-white/10 text-center">
              <div className="flex flex-col items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Step {step.step}</span>
                <span className="text-5xl font-extrabold text-brand-500/20" aria-hidden="true">{step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
              <p className="text-sm text-[#c9d1d9] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/onboarding/step-1"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start building your site for free
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function TestimonialSection({ data }: { data: IndustryPageData }) {
  const { testimonial } = data;
  return (
    <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-8">
          Real results
        </span>
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <div aria-hidden="true" className="text-6xl font-serif text-brand-100 leading-none mb-4 select-none">&ldquo;</div>
          <blockquote className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
            {testimonial.quote}
          </blockquote>
          <div className="flex gap-1 justify-center mb-6" role="img" aria-label="5 out of 5 stars">
            {[1,2,3,4,5].map((star) => (
              <svg key={star} aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ring-2 ring-offset-2 ring-brand-200`}
              aria-hidden="true"
            >
              {testimonial.initials}
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
              <p className="text-gray-500 text-xs">{testimonial.business}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection({ data }: { data: IndustryPageData }) {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Common questions from {data.industryLabel.toLowerCase()}s
          </h2>
        </div>
        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                <span>{faq.question}</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-600 flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Bottom ───────────────────────────────────────────────────────────────

function CtaSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #14532d 55%, #166534 100%)" }}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div aria-hidden="true" className="absolute top-0 left-0 w-64 h-64 bg-brand-300/20 rounded-full blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          Ready to grow your {data.industryLabel.toLowerCase()} business?
        </h2>
        <p className="text-lg text-brand-100 mb-10">
          Get your professional website live in under an hour. No tech skills needed. Free to try.
        </p>
        <Link
          href="/onboarding/step-1"
          className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold text-lg px-10 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get started free — no credit card required
          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <p className="text-xs text-brand-200/80 mt-5">
          No spam. No long-term contracts. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ data }: { data: IndustryPageData }) {
  return (
    <footer className="bg-[#0d1117] text-gray-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Groundwork</span>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
          <Link href="/pricing" className="hover:text-brand-400 transition-colors">Pricing</Link>
          <Link href="/#features" className="hover:text-brand-400 transition-colors">Features</Link>
          <Link href="/blog" className="hover:text-brand-400 transition-colors">Blog</Link>
          {data.blogPost && (
            <Link href={data.blogPost.href} className="hover:text-brand-400 transition-colors">
              Read: {data.blogPost.title} →
            </Link>
          )}
          <Link href="/onboarding/step-1" className="hover:text-brand-400 transition-colors">Get started</Link>
        </div>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Groundwork. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function IndustryLandingPage({ data }: { data: IndustryPageData }) {
  return (
    <>
      <JsonLd data={data} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection data={data} />
          <FeaturesSection data={data} />
          <HowItWorksSection data={data} />
          <TestimonialSection data={data} />
          <FAQSection data={data} />
          <CtaSection data={data} />
        </main>
        <Footer data={data} />
      </div>
    </>
  );
}
