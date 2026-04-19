import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — GroundWork",
  description:
    "Read GroundWork's Terms of Service. Learn about the rules and guidelines for using the GroundWork platform.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 1, 2026";
const COMPANY_NAME = "GroundWork";
const COMPANY_EMAIL = "legal@groundworklocal.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-surface-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-body text-surface-400 mb-2">
            Effective {EFFECTIVE_DATE}
          </p>
          <h1 className="font-display text-4xl font-bold text-surface-950 mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-surface-400 text-lg">
            Please read these terms carefully before using {COMPANY_NAME}.
          </p>
        </div>

        <div className="prose-container space-y-10 font-body text-surface-950">

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-surface-600 leading-relaxed">
              By accessing or using the {COMPANY_NAME} platform (&ldquo;Service&rdquo;), you agree to be
              bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these
              Terms, please do not use the Service. These Terms apply to all visitors, users,
              and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              2. Description of Service
            </h2>
            <p className="text-surface-600 leading-relaxed">
              {COMPANY_NAME} provides an all-in-one marketing and website platform for local
              service businesses, including website builder tools, local SEO features, lead
              capture forms and analytics capabilities
              (collectively, the &ldquo;Service&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              3. Accounts and Registration
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain the security of your password and accept responsibility for all activities under your account.</li>
              <li>Promptly notify us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-600 hover:underline">{COMPANY_EMAIL}</a> of any unauthorized use of your account.</li>
              <li>Not share your account credentials with any third party.</li>
            </ul>
            <p className="text-surface-600 leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              4. Subscriptions and Billing
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              Some features of the Service require a paid subscription. By subscribing you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>Pay all applicable fees as described on our pricing page.</li>
              <li>Authorize us to charge your payment method on a recurring basis.</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
              <li>Fees are non-refundable except as required by applicable law or as expressly stated in these Terms.</li>
            </ul>
            <p className="text-surface-600 leading-relaxed mt-3">
              We reserve the right to modify pricing with 30 days notice to existing subscribers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              5. Acceptable Use
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>Violate any applicable law, regulation, or third-party rights.</li>
              <li>Send unsolicited communications, spam, or deceptive content.</li>
              <li>Upload or distribute malicious code, viruses, or any software that disrupts the Service.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation.</li>
              <li>Scrape, crawl, or systematically extract data from the Service without our written consent.</li>
              <li>Engage in any activity that could harm, disable, or overburden our infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              6. Your Content
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              You retain ownership of content you upload to the Service (&ldquo;Your Content&rdquo;). By
              uploading content, you grant {COMPANY_NAME} a worldwide, non-exclusive, royalty-free
              license to use, host, store, reproduce, and display Your Content solely for the
              purpose of operating and improving the Service.
            </p>
            <p className="text-surface-600 leading-relaxed">
              You represent and warrant that you have all rights necessary to grant this license,
              and that Your Content does not infringe any third-party intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              7. Intellectual Property
            </h2>
            <p className="text-surface-600 leading-relaxed">
              The Service and its original content, features, and functionality are owned by
              {" "}{COMPANY_NAME} and are protected by intellectual property laws. You may not copy,
              modify, distribute, sell, or lease any part of the Service without our prior written
              consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-surface-600 leading-relaxed">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT
              THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL
              COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-surface-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_NAME.toUpperCase()} AND ITS AFFILIATES,
              OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR
              GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE. OUR TOTAL
              LIABILITY TO YOU FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU
              PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              10. Indemnification
            </h2>
            <p className="text-surface-600 leading-relaxed">
              You agree to indemnify and hold harmless {COMPANY_NAME} and its affiliates, officers,
              employees, and agents from any claims, damages, losses, or expenses (including
              reasonable attorneys&rsquo; fees) arising from your use of the Service, Your Content, or
              your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              11. Termination
            </h2>
            <p className="text-surface-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at any time,
              with or without cause, and with or without notice. Upon termination, your right to
              use the Service ceases immediately. You may cancel your account at any time through
              your account settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              12. Governing Law
            </h2>
            <p className="text-surface-600 leading-relaxed">
              These Terms are governed by the laws of the State of Delaware, United States,
              without regard to its conflict-of-law provisions. Any disputes arising from these
              Terms shall be resolved exclusively in the courts located in Delaware.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              13. Changes to Terms
            </h2>
            <p className="text-surface-600 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes
              by email or by posting a notice on the Service at least 14 days before the changes
              take effect. Your continued use of the Service after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              14. Contact Us
            </h2>
            <p className="text-surface-600 leading-relaxed">
              If you have questions about these Terms, please contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-600 hover:underline">
                {COMPANY_EMAIL}
              </a>.
            </p>
          </section>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-surface-100 flex flex-wrap gap-4 text-sm text-surface-400">
          <Link href="/" className="hover:text-surface-950 transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-surface-950 transition-colors">Privacy Policy</Link>
          <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-surface-950 transition-colors">Contact</a>
        </div>
      </main>
    </div>
  );
}
