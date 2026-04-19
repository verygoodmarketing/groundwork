"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Check, Globe, Mail, MapPin, Star } from "lucide-react";
import { GroundworkLogoFullLight } from "@/components/brand/GroundworkLogo";
import { UtmCapture } from "@/components/UtmCapture";

interface ColdEmailLandingPageProps {
  trade?: "plumbers" | "electricians" | "cleaners" | "contractors";
}

const TRADE_COPY = {
  plumbers: {
    example: "plumber",
    city: "your city",
  },
  electricians: {
    example: "electrician",
    city: "your city",
  },
  cleaners: {
    example: "cleaning service",
    city: "your city",
  },
  contractors: {
    example: "contractor",
    city: "your city",
  },
};

export function ColdEmailLandingPage({ trade }: ColdEmailLandingPageProps) {
  const tradeCopy = trade ? TRADE_COPY[trade] : { example: "service business", city: "your city" };

  return (
    <div className="min-h-screen bg-white">
      {/* UTM Parameter Capture */}
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>

      {/* Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <GroundworkLogoFullLight className="h-8" />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
              >
                Pricing
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
            Get found online.
            <br />
            Win more customers.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-neutral-600">
            GroundWork is a website platform built specifically for local service businesses —
            plumbers, electricians, cleaners, and contractors. No agency required.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-block rounded-lg bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-brand-700"
            >
              Start your free 14-day trial
            </Link>
            <p className="mt-3 text-sm text-neutral-500">No credit card required</p>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-brand-600" />
              Live in under an hour
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-brand-600" />
              Lead capture built in
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-brand-600" />
              Local SEO from day one
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <Check className="h-5 w-5 text-brand-600" />
              $39/month after trial
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-b border-neutral-100 bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-4xl font-bold text-neutral-900">
            You’re leaving work on the table
          </h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-700">
            <p>
              When someone searches for a {tradeCopy.example} in {tradeCopy.city} after 5pm on a
              Tuesday — does your business show up?
            </p>
            <p>And if they land on your site, can they request a quote without calling?</p>
            <p>
              Most local service businesses can’t answer yes to both. Those leads quietly go to the
              next result. You never knew they were there.
            </p>
            <p className="text-xl font-semibold text-brand-700">
              That’s the problem GroundWork solves.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold text-neutral-900">
            Everything you need to get found and get hired
          </h2>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {/* Feature 1: Professional Website */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100">
                <Globe className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-900">Professional Website</h3>
              <p className="mt-2 text-lg font-semibold text-brand-600">Live in under an hour</p>
              <p className="mt-4 text-neutral-700">
                Choose a template designed for your trade. Add your services, service area, and
                contact info. Publish with one click. No design skills required.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  Mobile-optimized design
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  Click-to-call on every page
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  Service area pages for local SEO
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  Fast, secure hosting included
                </li>
              </ul>
            </div>

            {/* Feature 2: Lead Capture */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-900">Lead Capture</h3>
              <p className="mt-2 text-lg font-semibold text-blue-600">
                Turn visitors into customers
              </p>
              <p className="mt-4 text-neutral-700">
                Every page has a lead form built in. Collect quote requests, schedule estimates, or
                capture emails — even when you’re on a job site.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  Contact forms on every page
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  Lead inbox (never miss a request)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  Email + SMS notifications
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  Follow-up email automation
                </li>
              </ul>
            </div>

            {/* Feature 3: Local SEO */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                <MapPin className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-900">Local SEO</h3>
              <p className="mt-2 text-lg font-semibold text-violet-600">
                Show up first when customers search
              </p>
              <p className="mt-4 text-neutral-700">
                GroundWork sets up your site for local search from day one. We handle the technical
                SEO so you can focus on the work.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  Service area optimization
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  Google Business Profile integration
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  Sitemap + structured data
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  Industry-specific keywords
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="border-b border-neutral-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold text-neutral-900">
            Built for the trades, by people who get it
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="mt-4 text-neutral-700">
                “I was paying $200/month for a website that didn’t do anything. GroundWork gives me
                lead forms, email, and SEO for $39. It’s a no-brainer.”
              </p>
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <p className="font-semibold text-neutral-900">Mike S.</p>
                <p className="text-sm text-neutral-600">Plumber, Fresno CA</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="mt-4 text-neutral-700">
                “I got my first lead through the contact form within 48 hours of going live. Paid
                for itself in one job.”
              </p>
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <p className="font-semibold text-neutral-900">Sarah L.</p>
                <p className="text-sm text-neutral-600">Electrician, Spokane WA</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="mt-4 text-neutral-700">
                “Setting up my site took 45 minutes. I’ve had it for 3 weeks and already have 6
                quote requests in my inbox.”
              </p>
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <p className="font-semibold text-neutral-900">Carlos R.</p>
                <p className="text-sm text-neutral-600">Landscaper, Mobile AL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-4xl font-bold text-neutral-900">
            Simple pricing. No surprises.
          </h2>

          <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">Starter Plan</h3>
                <p className="mt-1 text-neutral-600">Everything you need to get started</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-neutral-900">$39</p>
                <p className="text-neutral-600">/month</p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                1 professional website
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                GroundWork subdomain
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Lead capture forms + inbox
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Click-to-call + mobile optimized
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Local SEO setup
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Email marketing (200 contacts)
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Google Business Profile integration
              </li>
              <li className="flex items-start gap-2 text-neutral-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                Basic analytics
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/signup"
                className="block w-full rounded-lg bg-brand-600 py-4 text-center text-lg font-semibold text-white hover:bg-brand-700"
              >
                Start free 14-day trial →
              </Link>
              <p className="mt-3 text-center text-sm text-neutral-600">
                No credit card required. Cancel anytime. No contracts.
              </p>
            </div>

            {/* ROI Callout */}
            <div className="mt-8 rounded-lg border-2 border-amber-200 bg-amber-50 p-6">
              <p className="text-lg font-semibold text-amber-900">
                💰 One new customer pays for 4+ months
              </p>
              <p className="mt-2 text-sm text-amber-800">
                If GroundWork helps you land even one extra job, it pays for itself. Most customers
                get their first lead within the first week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-neutral-100 bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-4xl font-bold text-neutral-900">Common questions</h2>

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                How long does it take to get my site live?
              </h3>
              <p className="mt-2 text-neutral-700">
                Most customers go live in under an hour. Choose a template, add your info, and
                publish. If you get stuck, we’ll help you set it up.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Do I need design or technical skills?
              </h3>
              <p className="mt-2 text-neutral-700">
                Nope. GroundWork templates are pre-designed for your trade. Just fill in your
                business details and you’re done.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                What if I already have a website?
              </h3>
              <p className="mt-2 text-neutral-700">
                You can replace it or run GroundWork alongside it. Many customers use GroundWork for
                lead capture and email marketing even if they keep their existing site.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Can I use my own domain (e.g., myplumbing.com)?
              </h3>
              <p className="mt-2 text-neutral-700">
                Yes, on the Pro plan ($79/month). Starter plan includes a free GroundWork subdomain
                (yourbusiness.groundworklocal.com).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">How do I get paid?</h3>
              <p className="mt-2 text-neutral-700">
                GroundWork doesn’t handle payments — it captures leads and sends them to you via
                email/SMS. You quote and invoice customers the way you always have.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                What happens after my 14-day trial?
              </h3>
              <p className="mt-2 text-neutral-700">
                You choose a plan ($39/mo Starter or $79/mo Pro) or cancel. No credit card required
                to start the trial.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Can I cancel anytime?</h3>
              <p className="mt-2 text-neutral-700">
                Yes. No contracts, no cancellation fees. If you’re not happy, we’ll refund your
                first month — no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-brand-600 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to stop missing leads?</h2>
          <p className="mt-4 text-xl text-brand-100">
            Start your free 14-day trial. No credit card required. Get your site live in under an
            hour and start capturing leads today.
          </p>

          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-brand-600 shadow-lg hover:bg-neutral-50"
            >
              Start your free trial →
            </Link>
          </div>

          <p className="mt-6 text-sm text-brand-100">
            Questions? Email{" "}
            <a href="mailto:brad@groundworklocal.com" className="underline">
              brad@groundworklocal.com
            </a>{" "}
            or call. Real human, fast response.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="h-4 w-4 text-brand-600" />
              No contracts
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="h-4 w-4 text-brand-600" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="h-4 w-4 text-brand-600" />
              Money-back guarantee
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="h-4 w-4 text-brand-600" />
              Secure via Stripe
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="h-4 w-4 text-brand-600" />
              GDPR compliant
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-neutral-600">
            <Link href="/pricing" className="hover:text-neutral-900">
              Pricing
            </Link>
            <Link href="/#features" className="hover:text-neutral-900">
              Features
            </Link>
            <Link href="/about" className="hover:text-neutral-900">
              About
            </Link>
            <Link href="mailto:brad@groundworklocal.com" className="hover:text-neutral-900">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-neutral-900">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-neutral-900">
              Privacy Policy
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} GroundWork. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
