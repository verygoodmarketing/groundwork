"use client";

import { useState } from "react";

// ─── Checklist content (from lead magnet doc) ────────────────────────────────

const CHECKLIST_SECTIONS = [
  {
    id: "getting-found",
    heading: "Getting Found",
    items: [
      {
        number: 1,
        title: "Google Business Profile is claimed and complete",
        detail:
          "Business name, category, phone, address, hours, and photos are all filled in. Your profile shows up when someone searches \"[your trade] near me.\"",
      },
      {
        number: 2,
        title: "Your website clearly says what you do and where you work",
        detail:
          "A visitor can tell within 5 seconds: what service you offer, what area you cover, and how to contact you.",
      },
      {
        number: 3,
        title: "Your phone number is clickable on mobile",
        detail:
          "Most local searches happen on phones. If your number isn't tappable, you're losing calls.",
      },
      {
        number: 4,
        title: "Your website is listed on the top local directories",
        detail:
          "Name, address, and phone number (NAP) match exactly on Google, Yelp, Bing Places, and Facebook.",
      },
    ],
  },
  {
    id: "building-trust",
    heading: "Building Trust",
    items: [
      {
        number: 5,
        title: "You have at least 10 Google reviews (and you reply to them)",
        detail:
          "Reviews are the #1 trust signal for local service businesses. No reviews = no trust. Replying shows you care.",
      },
      {
        number: 6,
        title: "Your website has real photos — not stock images",
        detail:
          "Photos of your work, your truck, or your team build trust that no stock photo can match.",
      },
      {
        number: 7,
        title: "You have a clear, simple way for customers to contact or book you",
        detail:
          "A contact form, booking link, or phone number that works. No friction, no confusion.",
      },
    ],
  },
  {
    id: "staying-top-of-mind",
    heading: "Staying Top of Mind",
    items: [
      {
        number: 8,
        title: "You have a way to collect customer email addresses",
        detail:
          "A simple opt-in, a booking form, or an inquiry form that captures contact info you own — not just followers you rent.",
      },
      {
        number: 9,
        title: "You follow up with past customers",
        detail:
          "A check-in email, review request, or seasonal reminder keeps you top of mind when a neighbor asks for a recommendation.",
      },
      {
        number: 10,
        title: "You can see where your leads are coming from",
        detail:
          "You know whether customers found you on Google, from a referral, or through your website — so you can do more of what works.",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface LeadMagnetOptInProps {
  /** The current page slug or URL — stored with the lead for attribution. */
  sourcePage?: string;
}

export function LeadMagnetOptIn({ sourcePage }: LeadMagnetOptInProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          sourcePage: sourcePage ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(
          (data as { error?: string }).error ??
            "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="my-8 rounded-2xl bg-white border border-amber-200 shadow-md p-8 max-w-2xl mx-auto">
        {/* Amber accent strip */}
        <div className="h-1 w-16 rounded-full bg-[#D97706] mb-6" aria-hidden="true" />

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          You&apos;re all set — check your inbox.
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your checklist is on its way. While you wait, take a look at how
          Groundwork helps local service businesses handle the hard parts:
          building a site that gets found, capturing leads, and following up
          automatically.
        </p>

        <a
          href="https://groundwork.co"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#D97706] hover:text-amber-700 transition-colors"
        >
          Start your free trial →
        </a>

        {/* Inline checklist */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h4 className="text-base font-bold text-gray-900 mb-4">
            Your 10-Point Online Presence Checklist
          </h4>
          <p className="text-sm text-gray-500 mb-6 italic">
            Are customers finding you — or your competitor down the street?
          </p>

          <div className="space-y-6">
            {CHECKLIST_SECTIONS.map((section) => (
              <div key={section.id}>
                <h5 className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-3">
                  {section.heading}
                </h5>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.number} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-amber-300 flex items-center justify-center text-xs font-bold text-amber-700">
                        {item.number}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-900 font-medium">
              <strong>8–10 checked:</strong> You&apos;re in great shape.
            </p>
            <p className="text-sm text-amber-900 mt-1">
              <strong>5–7 checked:</strong> Good foundation — a few gaps are costing you customers.
            </p>
            <p className="text-sm text-amber-900 mt-1">
              <strong>0–4 checked:</strong> Your competitors are showing up where you aren&apos;t. Time to fix that.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl bg-white border border-amber-200 shadow-md overflow-hidden max-w-2xl mx-auto">
      {/* Amber top accent bar */}
      <div className="h-1 bg-[#D97706]" aria-hidden="true" />

      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
          Are customers finding your business online?
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          Download the free 10-point checklist every local service business
          should run through — and find out exactly what&apos;s costing you
          customers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="lead-magnet-email" className="sr-only">
            Your email address
          </label>
          <input
            id="lead-magnet-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            aria-describedby={status === "error" ? "lead-magnet-error" : undefined}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-shrink-0 bg-[#D97706] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
          >
            {status === "loading" ? "Sending…" : "Get My Free Checklist"}
          </button>
        </form>

        {status === "error" && (
          <p
            id="lead-magnet-error"
            role="alert"
            className="mt-3 text-sm text-red-600"
          >
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam, ever. We&apos;ll send you the checklist — that&apos;s it.
        </p>
      </div>
    </div>
  );
}
