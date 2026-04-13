import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Groundwork",
  description:
    "Groundwork helps local service businesses — plumbers, cleaners, landscapers, and contractors — get a professional website and marketing tools live in under an hour.",
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-surface-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg text-surface-950 hover:text-brand-600 transition-colors"
          >
            Groundwork
          </Link>
          <Link
            href="/onboarding/step-1"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Get started →
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-surface-950 mb-4">
            About Groundwork
          </h1>
          <p className="font-body text-surface-400 text-lg">
            We built the marketing platform we wish existed for local service businesses.
          </p>
        </div>

        <div className="space-y-10 font-body text-surface-950">
          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              Our mission
            </h2>
            <p className="text-surface-600 leading-relaxed">
              Groundwork exists to help local service businesses — plumbers, electricians, cleaners, landscapers, contractors, photographers, and everyone in between — build a professional online presence and grow their customer base without needing a web developer, a marketing agency, or a tech background.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              Why we built this
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              Local service businesses are the backbone of every community. Plumbers fix your pipes. Electricians keep the lights on. Cleaners make your home livable. These are skilled, hard-working people who are experts at their trade — but most of them are invisible online.
            </p>
            <p className="text-surface-600 leading-relaxed">
              The tools that exist for marketing and websites were built for tech-savvy founders and enterprise teams. They&rsquo;re complex, expensive, and require too much time to learn. Groundwork is different: we built something that any business owner can set up in under an hour, without any tech skills, and that actually works for winning local jobs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              What we offer
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              Groundwork bundles the five tools that local businesses actually need:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li><strong>Professional website</strong> — live in under an hour, no code required</li>
              <li><strong>Local SEO</strong> — built in from day one so Google can find you</li>
              <li><strong>Lead capture</strong> — contact forms and click-to-call that funnel inquiries to your inbox</li>
              <li><strong>Email marketing</strong> — send newsletters, promotions, and seasonal offers to your customer list</li>
              <li><strong>Review requests</strong> — automated prompts that help you collect more 5-star Google reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              Get in touch
            </h2>
            <p className="text-surface-600 leading-relaxed">
              Have questions or feedback? We&rsquo;d love to hear from you. Reach us at{" "}
              <a href="mailto:hello@groundworklocal.com" className="text-brand-600 hover:underline">
                hello@groundworklocal.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-14 p-8 bg-brand-50 rounded-2xl border border-brand-100 text-center">
          <h3 className="font-display text-xl font-bold text-surface-950 mb-2">
            Ready to get your business online?
          </h3>
          <p className="text-surface-600 mb-5">
            14-day free trial. No credit card required. Live in under an hour.
          </p>
          <Link
            href="/onboarding/step-1"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
          >
            Start for free
          </Link>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-surface-100 flex flex-wrap gap-4 text-sm text-surface-400">
          <Link href="/" className="hover:text-surface-950 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-surface-950 transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-surface-950 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-surface-950 transition-colors">Terms of Service</Link>
        </div>
      </main>
    </div>
  );
}
