"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
  {
    icon: "🌐",
    title: "Professional website in under an hour",
    description:
      "Pick from 8+ templates designed for your trade. Add your business name, logo, phone, and hours — and you're live. No code. No designers. No hassle.",
  },
  {
    icon: "📞",
    title: "More calls, more leads",
    description:
      "Built-in contact forms and click-to-call buttons turn website visitors into real phone inquiries. Every lead lands in your inbox instantly.",
  },
  {
    icon: "🔍",
    title: "Show up on Google",
    description:
      "Versa sites are built for local SEO from day one — with auto-generated meta tags, sitemaps, and Google Business Profile integration so customers can find you when they search nearby.",
  },
  {
    icon: "✉️",
    title: "Email marketing made easy",
    description:
      "Capture email addresses from your site and send simple newsletters or promotions to your customers. Seasonal deals, reminders, thank-you notes — done in minutes.",
  },
  {
    icon: "⭐",
    title: "More 5-star reviews",
    description:
      "After a job, send a quick review request via email. One click from your customer lands them on your Google review page. More reviews = more trust = more business.",
  },
  {
    icon: "📊",
    title: "See what's working",
    description:
      "Simple, privacy-first analytics show you how many people visit your site, which pages they look at, and how many contact you — no cookie banners needed.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Pick your template",
    description:
      "Choose from templates designed for your business type — plumbing, cleaning, landscaping, photography, and more.",
  },
  {
    step: "2",
    title: "Fill in your details",
    description:
      "Add your business name, phone number, services, photos, and a short description. Takes about 20 minutes.",
  },
  {
    step: "3",
    title: "Go live with your domain",
    description:
      "We provision a free subdomain instantly, or connect your existing domain. SSL is automatic. You're live.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria T.",
    business: "Spotless Cleaning Co.",
    quote:
      "I had no website for 6 years. I built mine on Versa in 45 minutes and got my first online lead within a week. Game changer.",
  },
  {
    name: "Dave R.",
    business: "Ridge Line Landscaping",
    quote:
      "My old website was from 2015. Versa made it stupid easy to get a new one up that actually looks professional. Customers tell me all the time.",
  },
  {
    name: "Sandra K.",
    business: "K&M Photography",
    quote:
      "The review request tool alone was worth it. I went from 12 Google reviews to 47 in two months just by asking after every session.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$39",
    period: "/month",
    description: "Everything you need to get online and start getting leads.",
    features: [
      "Professional website with 1 custom domain",
      "Contact forms + lead inbox",
      "Click-to-call + mobile-optimized",
      "Basic SEO + sitemap",
      "Up to 200 contacts for email",
      "Google Business Profile integration",
      "Basic analytics",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For businesses ready to grow faster and keep more customers.",
    features: [
      "Everything in Starter",
      "Up to 500 email contacts",
      "Email broadcast + newsletter",
      "Review request campaigns",
      "Priority email support",
      "Advanced analytics",
      "Early access to new features",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600 tracking-tight">
              Versa
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#waitlist"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign in
            </a>
            <a
              href="#waitlist"
              className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get early access
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                className="block w-full bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition-colors"
                onClick={() => { setMenuOpen(false); document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Get early access
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Now in early access — join the waitlist
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Your business deserves{" "}
          <span className="text-indigo-600">to be found online.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Versa helps local service businesses — plumbers, cleaners, landscapers, photographers, and more — get a professional website live in under an hour. No tech skills. No agencies. No nonsense.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a
            href="#waitlist"
            className="bg-indigo-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Get early access — it&apos;s free
          </a>
          <a
            href="#how-it-works"
            className="bg-white text-gray-700 font-semibold text-lg px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Live in under an hour
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Versa bundles the 5 tools that local businesses actually need into one simple platform — so you can stop paying for 5 different subscriptions and start actually using them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-indigo-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Up and running in 3 steps
          </h2>
          <p className="text-lg text-gray-600">
            No learning curve. No technical knowledge required.
          </p>
        </div>

        <div className="space-y-8">
          {HOW_IT_WORKS.map((step, index) => (
            <div
              key={step.step}
              className="flex gap-6 items-start bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {step.step}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="hidden sm:block flex-shrink-0 self-center ml-auto text-indigo-300">
                  <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Local businesses love Versa
          </h2>
          <p className="text-lg text-gray-600">
            Real results from real business owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                <span className="sr-only">5 out of 5 stars</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} aria-hidden="true" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600">
            No setup fees. No long-term contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 ring-2 ring-indigo-600"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-2">
                  Most popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-indigo-100" : "text-gray-600"}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                   <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg
                      aria-hidden="true"
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-indigo-200" : "text-indigo-600"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={plan.highlighted ? "text-indigo-100" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block w-full text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Both plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate submission — will wire to real API when backend is ready
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 bg-indigo-600 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to get more customers?
        </h2>
        <p className="text-lg text-indigo-100 mb-8">
          Join hundreds of local business owners getting early access to Versa. Free to try. No tech skills required.
        </p>

        {submitted ? (
          <div className="bg-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-indigo-200">
              We&apos;ll be in touch soon with your early access invite. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? "Joining..." : "Get early access"}
            </button>
          </form>
        )}

        <p className="text-xs text-indigo-300 mt-4">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">Versa</span>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Websites and marketing tools for local service businesses.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400 cursor-default">About</span></li>
                <li><span className="text-gray-400 cursor-default">Blog</span></li>
                <li><a href="#waitlist" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Versa. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-gray-500">Privacy Policy</span>
            <span className="text-gray-500">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
