import Link from "next/link";
import Image from "next/image";
import { FileX, RefreshCcw, Clock } from "lucide-react";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { PlanCTAButton } from "@/components/pricing/PlanCTAButton";
import { PricingNavCTA } from "@/components/pricing/PricingNavCTA";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

type Plan = {
  key: "STARTER" | "PRO";
  name: string;
  price: string;
  priceMonthly: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  paymentLink: string | null;
  highlighted: boolean;
};

type Props = {
  plans: Plan[];
};

function CheckIcon({ highlighted }: { highlighted: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlighted ? "text-brand-400" : "text-brand-600"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col ${
        plan.highlighted
          ? "border-t-4 border-brand-500 shadow-2xl ring-1 ring-white/10"
          : "bg-white border border-gray-200 shadow-sm hover:border-brand-200 hover:shadow-md transition-all duration-200"
      }`}
      style={
        plan.highlighted
          ? { background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" }
          : undefined
      }
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            Most popular
          </span>
        </div>
      )}

      <div className="flex-1">
        <h2
          className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-gray-900"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {plan.name}
        </h2>
        <div className="flex items-baseline gap-1 mb-3">
          <span
            className={`text-5xl font-extrabold tracking-tight ${plan.highlighted ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {plan.price}
          </span>
          <span
            className={`text-sm font-medium ${plan.highlighted ? "text-gray-400" : "text-gray-400"}`}
          >
            {plan.period}
          </span>
        </div>
        <p
          className={`text-sm mb-7 ${plan.highlighted ? "text-gray-300" : "text-gray-500"}`}
        >
          {plan.description}
        </p>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <CheckIcon highlighted={plan.highlighted} />
              <span
                className={plan.highlighted ? "text-gray-100" : "text-gray-600"}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <PlanCTAButton
        planKey={plan.key}
        cta={plan.cta}
        highlighted={plan.highlighted}
      />
    </div>
  );
}

const FAQ = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts. You can cancel your subscription at any time from your billing portal.",
  },
  {
    q: "What happens after my trial ends?",
    a: "After your 14-day free trial, you'll be billed monthly. You won't be charged without warning — we'll email you before your trial ends.",
  },
  {
    q: "Do I need a credit card to start the trial?",
    a: "No. You can start building your site and try all features without entering a credit card.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
  },
  {
    q: "What's a GroundWork subdomain?",
    a: "We give every business a free subdomain like yourbiz.groundworklocal.com. On the Pro plan you can connect your own domain (e.g. myplumbing.com).",
  },
  {
    q: "Is my website data secure?",
    a: "Yes. All sites are served over HTTPS, data is stored in encrypted databases, and we never share your information with third parties.",
  },
  {
    q: "How quickly can I get my business online?",
    a: "Most service businesses are live in under an hour. Our setup wizard walks you through every step.",
  },
  {
    q: "Is GroundWork built for businesses like mine?",
    a: "Yes. GroundWork is designed specifically for local service businesses — plumbers, electricians, HVAC techs, landscapers, cleaners, and contractors. Every feature is built around winning local jobs.",
  },
];

export function PricingPage({ plans }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <ExitIntentPopup />
      <UrgencyBanner />
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center"
              aria-label="GroundWork home"
            >
              <Image
                src="/brand/logo-horizontal-dark.png"
                alt="GroundWork"
                width={160}
                height={40}
                priority
              />
            </Link>
            <PricingNavCTA />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            Pricing
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More customers. Less hassle. One simple price.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Get your business found online, collect leads, and win more jobs —
            starting at $39/month. No setup fees. No contracts. 14-day free
            trial, no credit card required.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[
              "14-day free trial",
              "No credit card required",
              "Cancel anytime",
              "Live support",
              "Set up in under an hour",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-brand-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <PlanCard key={plan.key} plan={plan} />
              ))}
            </div>

            {/* Trust reinforcement row */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              {[
                { Icon: FileX, label: "No contracts", detail: "Month-to-month, always." },
                { Icon: RefreshCcw, label: "Cancel anytime", detail: "No fees, no hassle." },
                { Icon: Clock, label: "Setup in under an hour", detail: "Live faster than you think." },
              ].map(({ Icon, label, detail }) => (
                <div key={label} className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl ring-1 ring-brand-200 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Everything you get — side by side
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700 w-1/2">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">
                      Starter
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-brand-700 bg-brand-50 rounded-t-lg">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Professional website", true, true],
                    ["GroundWork subdomain", true, true],
                    ["Contact forms + lead inbox", true, true],
                    ["Basic SEO + sitemap", true, true],
                    ["Email contacts", "200", "500"],
                    ["Custom domain", false, true],
                    ["Email newsletter / broadcasts", false, true],
                    ["Review request campaigns", false, true],
                    ["Advanced analytics", false, true],
                  ].map(([feature, starter, pro]) => (
                    <tr key={String(feature)}>
                      <td className="py-3 pr-4 text-gray-700">{feature}</td>
                      <td className="text-center py-3 px-4">
                        <FeatureCell value={starter} />
                      </td>
                      <td className="text-center py-3 px-4 bg-brand-50/50">
                        <FeatureCell value={pro} highlighted />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Got questions? We&apos;ve got answers.
            </h2>
            <div className="space-y-6">
              {FAQ.map(({ q, a }) => (
                <div
                  key={q}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-6"
                >
                  <h3
                    className="font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0d1117 0%, #14532d 55%, #166534 100%)",
          }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to get more customers?
          </h2>
          <p className="text-lg text-brand-100 mb-8 max-w-xl mx-auto">
            Start your 14-day free trial today — no credit card required. Get
            your business online in under an hour.
          </p>
          <Link
            href="/onboarding/step-1"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30 active:scale-95"
          >
            Start free trial — no credit card needed
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
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-gray-400 py-8 px-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} GroundWork. All rights reserved.{" "}
          <Link href="/" className="hover:text-brand-400 transition-colors">
            Back to home
          </Link>
        </p>
      </footer>
    </div>
  );
}

function FeatureCell({
  value,
  highlighted,
}: {
  value: boolean | string;
  highlighted?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        className={`font-medium ${highlighted ? "text-brand-700" : "text-gray-700"}`}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <svg
        aria-label="Included"
        className={`w-5 h-5 mx-auto ${highlighted ? "text-brand-600" : "text-brand-500"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg
      aria-label="Not included"
      className="w-5 h-5 mx-auto text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
