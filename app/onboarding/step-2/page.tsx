"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { trpc } from "@/lib/trpc/client";
import { Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";

// Light-theme colour tokens
const C = {
  bg: "#ffffff",
  bgPage: "#f0f6fc",
  border: "#c9d1d9",
  borderFocus: "#22c55e",
  text: "#0d1117",
  muted: "#8b949e",
  brand: "#22c55e",
  brandHover: "#16a34a",
  brandText: "#16a34a",
  error: "#ef4444",
  errorBg: "#fef2f2",
  errorBorder: "#fca5a5",
};

const QUICK_PICK_CATEGORIES = ["Plumbing", "Electrical", "Cleaning", "Landscaping / Lawn Care"];

const SERVICE_CATEGORIES = [
  "Cleaning",
  "Electrical",
  "Landscaping / Lawn Care",
  "HVAC",
  "Painting",
  "Photography",
  "Plumbing",
  "Roofing",
  "Tree Service",
  "Other",
];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 63);
}

/** Suggest alternate slugs when the current one is taken */
function suggestSlug(slug: string): string[] {
  const base = slug.replace(/-\d+$/, ""); // strip trailing number
  return [`${base}-2`, `${base}-pro`, `${base}-local`];
}

/** Format a phone number as (555) 000-0000 while typing */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const inputCls =
  "w-full rounded-lg border px-4 py-3 text-sm font-body outline-none transition-colors";

export default function Step2Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    phone: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    serviceAreaRadius: "",
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [slugToCheck, setSlugToCheck] = useState("");
  const [addressExpanded, setAddressExpanded] = useState(false);
  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: slugCheck, isFetching: slugChecking } = trpc.business.checkSlug.useQuery(
    { slug: slugToCheck },
    { enabled: slugToCheck.length >= 2, staleTime: 5000 }
  );

  const updateOnboardingStep = trpc.business.updateOnboardingStep.useMutation({
    onSuccess: () => router.push("/onboarding/step-3"),
  });

  const createBusiness = trpc.business.create.useMutation({
    onSuccess: () => router.push("/onboarding/step-3"),
  });

  const { data: currentBusiness } = trpc.business.getCurrent.useQuery(undefined, {
    retry: false,
  });

  // Pre-fill from existing business if resuming
  useEffect(() => {
    if (currentBusiness) {
      setForm({
        name: currentBusiness.name ?? "",
        slug: currentBusiness.slug ?? "",
        phone: currentBusiness.phone ?? "",
        category: currentBusiness.category ?? "",
        address: currentBusiness.address ?? "",
        city: currentBusiness.city ?? "",
        state: currentBusiness.state ?? "",
        zip: currentBusiness.zip ?? "",
        serviceAreaRadius: currentBusiness.serviceAreaRadius?.toString() ?? "",
      });
      setSlugManuallyEdited(true);
    }
  }, [currentBusiness]);

  function handleNameChange(name: string) {
    setForm((f) => ({
      ...f,
      name,
      slug: slugManuallyEdited ? f.slug : toSlug(name),
    }));
    if (!slugManuallyEdited) {
      debouncedSlugCheck(toSlug(name));
    }
  }

  function handleSlugChange(slug: string) {
    const cleaned = toSlug(slug);
    setForm((f) => ({ ...f, slug: cleaned }));
    setSlugManuallyEdited(true);
    debouncedSlugCheck(cleaned);
  }

  function debouncedSlugCheck(slug: string) {
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    slugDebounceRef.current = setTimeout(() => {
      if (slug.length >= 2) setSlugToCheck(slug);
    }, 400);
  }

  function handlePhoneChange(raw: string) {
    setForm((f) => ({ ...f, phone: formatPhone(raw) }));
  }

  const isSlugAvailable = slugToCheck === form.slug && slugCheck?.available === true;
  const isSlugTaken = slugToCheck === form.slug && slugCheck?.available === false;
  const slugSuggestions = isSlugTaken ? suggestSlug(form.slug) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const radius = form.serviceAreaRadius ? parseInt(form.serviceAreaRadius) : undefined;

    if (currentBusiness) {
      await updateOnboardingStep.mutateAsync({
        step: 2,
        name: form.name,
        slug: form.slug,
        phone: form.phone || undefined,
        category: form.category || undefined,
        address: form.address || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        zip: form.zip || undefined,
        serviceAreaRadius: radius,
      });
    } else {
      await createBusiness.mutateAsync({
        name: form.name,
        slug: form.slug,
        phone: form.phone || undefined,
        category: form.category || undefined,
      });
    }
  }

  const isSubmitting = updateOnboardingStep.isPending || createBusiness.isPending;
  const submitError = updateOnboardingStep.error?.message ?? createBusiness.error?.message;
  const canContinue = !!form.name && !!form.slug && !!form.category && !!form.phone && !isSlugTaken;

  return (
    <OnboardingLayout currentStep={2}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="rounded-xl border p-6 shadow-sm space-y-5"
          style={{ background: C.bg, borderColor: C.border }}
        >
          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: C.text }}>
              Tell us about your business
            </h1>
            <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
              We'll use this to set up your website.
            </p>
          </div>

          {submitError && (
            <div
              className="rounded-lg border p-4 text-sm font-body"
              style={{ background: C.errorBg, borderColor: C.errorBorder, color: C.error }}
            >
              {submitError}
            </div>
          )}

          {/* Business name */}
          <div className="space-y-1">
            <label htmlFor="biz-name" className="block text-sm font-medium font-body" style={{ color: C.text }}>
              Business name <span style={{ color: C.error }}>*</span>
            </label>
            <input
              id="biz-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Mike's Plumbing"
              className={inputCls}
              style={{ borderColor: C.border, background: C.bg, color: C.text }}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
              onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
            />
          </div>

          {/* Business category */}
          <div className="space-y-2">
            <label htmlFor="biz-category" className="block text-sm font-medium font-body" style={{ color: C.text }}>
              Business category <span style={{ color: C.error }}>*</span>
            </label>
            {/* Quick-pick chips */}
            <div className="flex flex-wrap gap-2">
              {QUICK_PICK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, category: cat }))}
                  className="rounded-full px-3 py-1 text-xs font-medium font-body border transition-colors"
                  style={
                    form.category === cat
                      ? { background: C.brand, color: "#ffffff", borderColor: C.brand }
                      : { background: C.bgPage, color: C.muted, borderColor: C.border }
                  }
                  onMouseEnter={(e) => {
                    if (form.category !== cat) e.currentTarget.style.borderColor = C.brand;
                  }}
                  onMouseLeave={(e) => {
                    if (form.category !== cat) e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Full dropdown */}
            <select
              id="biz-category"
              required
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputCls}
              style={{ borderColor: C.border, background: C.bg, color: form.category ? C.text : C.muted }}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
              onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <option value="">Select your trade</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label htmlFor="biz-phone" className="block text-sm font-medium font-body" style={{ color: C.text }}>
              Phone number <span style={{ color: C.error }}>*</span>
            </label>
            <input
              id="biz-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 000-0000"
              className={inputCls}
              style={{ borderColor: C.border, background: C.bg, color: C.text }}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
              onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
            />
          </div>

          {/* Slug with live availability */}
          <div className="space-y-1">
            <label htmlFor="biz-slug" className="block text-sm font-medium font-body" style={{ color: C.text }}>
              Your website address <span style={{ color: C.error }}>*</span>
            </label>
            <div
              className="flex items-center rounded-lg border overflow-hidden transition-colors focus-within:ring-2"
              style={{ borderColor: C.border, background: C.bg }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <input
                id="biz-slug"
                type="text"
                required
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="mikes-plumbing"
                className="flex-1 px-4 py-3 text-sm font-body outline-none"
                style={{ background: "transparent", color: C.text }}
              />
              <span
                className="px-3 py-3 text-sm font-body border-l whitespace-nowrap"
                style={{ borderColor: C.border, color: C.muted, background: C.bgPage }}
              >
                .versa.app
              </span>
              <div className="pr-3 pl-2">
                {slugChecking && <Loader2 className="w-4 h-4 animate-spin" style={{ color: C.muted }} />}
                {!slugChecking && isSlugAvailable && (
                  <CheckCircle2 className="w-4 h-4" style={{ color: C.brand }} />
                )}
                {!slugChecking && isSlugTaken && (
                  <XCircle className="w-4 h-4" style={{ color: C.error }} />
                )}
              </div>
            </div>
            <p className="text-xs font-body" style={{ color: C.muted }}>
              Letters, numbers and hyphens only
            </p>
            {isSlugAvailable && (
              <p className="text-xs font-body" style={{ color: C.brandText }}>
                ✓ Available: {form.slug}.versa.app
              </p>
            )}
            {isSlugTaken && (
              <div>
                <p className="text-xs font-body" style={{ color: C.error }}>
                  ✗ That URL is taken. Try one of these:
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {slugSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="text-xs font-body underline"
                      style={{ color: C.brand }}
                      onClick={() => {
                        setForm((f) => ({ ...f, slug: s }));
                        setSlugManuallyEdited(true);
                        debouncedSlugCheck(s);
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Address accordion */}
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: C.border }}>
            <button
              type="button"
              onClick={() => setAddressExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium font-body transition-colors text-left"
              style={{ background: C.bgPage, color: C.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              <span>
                {addressExpanded ? "Hide address" : "Add your address"}
                <span className="font-normal ml-1">(optional — adds credibility to local SEO)</span>
              </span>
              {addressExpanded
                ? <ChevronUp className="w-4 h-4 flex-shrink-0" />
                : <ChevronDown className="w-4 h-4 flex-shrink-0" />
              }
            </button>

            {addressExpanded && (
              <div className="px-4 pb-4 pt-3 space-y-3" style={{ background: C.bg }}>
                <div className="space-y-1">
                  <label htmlFor="biz-address" className="block text-xs font-medium font-body" style={{ color: C.muted }}>
                    Street address
                  </label>
                  <input
                    id="biz-address"
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    placeholder="123 Main St"
                    className={inputCls}
                    style={{ borderColor: C.border, background: C.bg, color: C.text }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label htmlFor="biz-city" className="block text-xs font-medium font-body" style={{ color: C.muted }}>City</label>
                    <input
                      id="biz-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder="Portland"
                      className={inputCls}
                      style={{ borderColor: C.border, background: C.bg, color: C.text }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="biz-state" className="block text-xs font-medium font-body" style={{ color: C.muted }}>State</label>
                    <input
                      id="biz-state"
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      placeholder="OR"
                      maxLength={2}
                      className={inputCls}
                      style={{ borderColor: C.border, background: C.bg, color: C.text }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="biz-zip" className="block text-xs font-medium font-body" style={{ color: C.muted }}>ZIP code</label>
                    <input
                      id="biz-zip"
                      type="text"
                      value={form.zip}
                      onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                      placeholder="97201"
                      className={inputCls}
                      style={{ borderColor: C.border, background: C.bg, color: C.text }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="biz-radius" className="block text-xs font-medium font-body" style={{ color: C.muted }}>
                      Service radius (miles)
                    </label>
                    <input
                      id="biz-radius"
                      type="number"
                      value={form.serviceAreaRadius}
                      onChange={(e) => setForm((f) => ({ ...f, serviceAreaRadius: e.target.value }))}
                      placeholder="25"
                      min={1}
                      max={500}
                      className={inputCls}
                      style={{ borderColor: C.border, background: C.bg, color: C.text }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer CTAs */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/onboarding/step-1")}
            className="flex-1 rounded-lg border px-4 py-3 text-sm font-medium font-body transition-colors"
            style={{ borderColor: C.border, color: C.muted, background: C.bg }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = "#8b949e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !canContinue}
            className="flex-[2] rounded-lg px-4 py-3 text-sm font-semibold text-white font-body transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            style={{ background: C.brand }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = C.brandHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.brand; }}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue →
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
