import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Groundwork",
  description:
    "Read Groundwork's Privacy Policy. Learn how we collect, use, and protect your personal information.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 1, 2026";
const COMPANY_NAME = "Groundwork";
const COMPANY_EMAIL = "privacy@groundworklocal.com";

export default function PrivacyPage() {
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
          <p className="text-sm font-body text-surface-400 mb-2">
            Effective {EFFECTIVE_DATE}
          </p>
          <h1 className="font-display text-4xl font-bold text-surface-950 mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-surface-400 text-lg">
            Your privacy matters. Here&rsquo;s how {COMPANY_NAME} handles your information.
          </p>
        </div>

        <div className="space-y-10 font-body text-surface-950">

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              We collect information to provide and improve the {COMPANY_NAME} Service:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-surface-700 mb-1">Account Information</h3>
                <p className="text-surface-600 leading-relaxed">
                  When you create an account, we collect your email address, name, and password
                  (stored securely as a hash). If you sign up via Google OAuth, we receive basic
                  profile data from Google.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-700 mb-1">Business Information</h3>
                <p className="text-surface-600 leading-relaxed">
                  During onboarding, we collect details about your business including business name,
                  service type, location, phone number, and website preferences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-700 mb-1">Usage Data</h3>
                <p className="text-surface-600 leading-relaxed">
                  We automatically collect information about how you interact with the Service,
                  including pages visited, features used, browser type, IP address, and device
                  information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-700 mb-1">Payment Information</h3>
                <p className="text-surface-600 leading-relaxed">
                  Payment processing is handled by Stripe. We do not store your full card details
                  on our servers. Stripe may collect and process payment information according to
                  their own privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Create and manage your account and business website.</li>
              <li>Process payments and manage subscriptions.</li>
              <li>Send transactional emails (account confirmation, receipts, security alerts).</li>
              <li>Send product updates and marketing communications (you may opt out at any time).</li>
              <li>Analyze usage patterns to improve and develop new features.</li>
              <li>Detect, investigate, and prevent fraudulent or illegal activity.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              3. Sharing Your Information
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>
                <strong>Service Providers:</strong> Trusted third-party vendors who help us operate
                the Service (e.g., hosting, analytics, email delivery, payment processing). They are
                bound by confidentiality obligations.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                governmental authority.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                sale of assets, your information may be transferred. We will notify you before your
                information becomes subject to a different privacy policy.
              </li>
              <li>
                <strong>With Your Consent:</strong> For any other purpose with your explicit consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              4. Cookies and Tracking
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to operate and improve the Service.
              These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>
                <strong>Essential Cookies:</strong> Required for authentication and core Service
                functionality. Cannot be disabled.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how users interact with the
                Service. We use privacy-respecting analytics tools.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and preferences.
              </li>
            </ul>
            <p className="text-surface-600 leading-relaxed mt-3">
              You can control cookies through your browser settings. Disabling certain cookies may
              affect your ability to use parts of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              5. Data Retention
            </h2>
            <p className="text-surface-600 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed
              to provide the Service. When you close your account, we will delete or anonymize your
              personal information within 90 days, except where we are required to retain it for
              legal or regulatory purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              6. Data Security
            </h2>
            <p className="text-surface-600 leading-relaxed">
              We implement industry-standard security measures to protect your information, including
              encryption in transit (TLS) and at rest, access controls, and regular security
              reviews. However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              7. Your Rights and Choices
            </h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-surface-600">
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request that we correct inaccurate information.
              </li>
              <li>
                <strong>Deletion:</strong> Request that we delete your personal information,
                subject to legal retention requirements.
              </li>
              <li>
                <strong>Portability:</strong> Request your data in a portable format.
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing emails at any time via the
                unsubscribe link in any email.
              </li>
            </ul>
            <p className="text-surface-600 leading-relaxed mt-3">
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-600 hover:underline">
                {COMPANY_EMAIL}
              </a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              8. Children&rsquo;s Privacy
            </h2>
            <p className="text-surface-600 leading-relaxed">
              The Service is not directed to children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If we learn that we have
              collected such information, we will delete it promptly. If you believe a child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              9. Third-Party Services
            </h2>
            <p className="text-surface-600 leading-relaxed">
              The Service may integrate with or link to third-party services such as Google,
              Stripe, and others. This Privacy Policy does not apply to those services. We
              encourage you to review their privacy policies before providing your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              10. International Transfers
            </h2>
            <p className="text-surface-600 leading-relaxed">
              Your information may be transferred to and processed in countries other than your
              own. We ensure that such transfers comply with applicable data protection laws,
              including through the use of standard contractual clauses where required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              11. Changes to This Policy
            </h2>
            <p className="text-surface-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by email or by posting a notice on the Service at least 14 days before the
              changes take effect. Your continued use of the Service after changes take effect
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-surface-950 mb-3">
              12. Contact Us
            </h2>
            <p className="text-surface-600 leading-relaxed">
              If you have questions or concerns about this Privacy Policy or how we handle your
              data, please contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-600 hover:underline">
                {COMPANY_EMAIL}
              </a>.
            </p>
          </section>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-surface-100 flex flex-wrap gap-4 text-sm text-surface-400">
          <Link href="/" className="hover:text-surface-950 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-surface-950 transition-colors">Terms of Service</Link>
          <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-surface-950 transition-colors">Contact</a>
        </div>
      </main>
    </div>
  );
}
