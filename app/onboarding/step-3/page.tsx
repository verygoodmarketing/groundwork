"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { trpc } from "@/lib/trpc/client";
import { Loader2, Check } from "lucide-react";

const C = {
  bg: "#ffffff",
  bgPage: "#f0f6fc",
  border: "#c9d1d9",
  borderFocus: "#22c55e",
  text: "#0d1117",
  muted: "#8b949e",
  brand: "#22c55e",
  brandHover: "#16a34a",
  error: "#ef4444",
  errorBg: "#fef2f2",
  errorBorder: "#fca5a5",
};

const TEMPLATES = [
  {
    id: "cleaners-v1",
    name: "CleanSlate",
    description: "Fresh, bright layout for cleaning businesses",
    categories: ["Cleaning"],
    accentStripe: "#22c55e",
  },
  {
    id: "plumbers-v1",
    name: "TradePro",
    description: "Bold, trust-focused design for trade services",
    categories: ["Plumbing", "HVAC", "Electrical"],
    accentStripe: "#3b82f6",
  },
  {
    id: "landscapers-v1",
    name: "GreenScape",
    description: "Natural, earthy tones for outdoor services",
    categories: ["Landscaping / Lawn Care", "Tree Service"],
    accentStripe: "#84cc16",
  },
  {
    id: "photographers-v1",
    name: "PortfolioFirst",
    description: "Portfolio-first layout for visual creatives",
    categories: ["Photography"],
    accentStripe: "#a855f7",
  },
  {
    id: "painters-v1",
    name: "ColorBurst",
    description: "High-contrast, colourful for painting services",
    categories: ["Painting"],
    accentStripe: "#f59e0b",
  },
  {
    id: "general-v1",
    name: "ProService",
    description: "Clean, professional — works for any trade",
    categories: ["Other", "Roofing"],
    accentStripe: "#64748b",
  },
];

const FONT_OPTIONS = [
  {
    id: "modern",
    label: "Modern",
    subLabel: "Plus Jakarta Sans / Inter",
    previewStyle: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
  },
  {
    id: "classic",
    label: "Classic",
    subLabel: "Playfair Display / Lato",
    previewStyle: { fontFamily: "Georgia, 'Times New Roman', serif" },
  },
  {
    id: "bold",
    label: "Bold",
    subLabel: "Bebas Neue / Open Sans",
    previewStyle: { fontFamily: "'Arial Black', Impact, sans-serif", letterSpacing: "0.05em" },
  },
];

const COLOR_OPTIONS = [
  { id: "#22c55e", label: "Green", bg: "#22c55e" },
  { id: "#3b82f6", label: "Blue", bg: "#3b82f6" },
  { id: "#a855f7", label: "Purple", bg: "#a855f7" },
  { id: "#f97316", label: "Orange", bg: "#f97316" },
];

const FILTER_CATEGORIES = ["All", "Plumbing", "Electrical", "Cleaning", "Landscaping / Lawn Care", "Other"];

/** Template placeholder card — layout sketch with accent stripe */
function TemplatePlaceholder({ accentStripe }: { accentStripe: string }) {
  return (
    <div className="h-20 w-full overflow-hidden flex flex-col gap-1 p-2" style={{ background: "#f8fafc" }}>
      <div className="h-2 rounded-sm w-full" style={{ background: accentStripe, opacity: 0.8 }} />
      <div className="flex gap-1 flex-1 mt-1">
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 rounded-sm" style={{ background: "#e2e8f0" }} />
          <div className="h-2 rounded-sm w-3/4" style={{ background: "#e2e8f0" }} />
          <div className="h-1.5 rounded-sm w-1/2 mt-auto" style={{ background: accentStripe, opacity: 0.4 }} />
        </div>
        <div className="w-10 h-full rounded-sm" style={{ background: "#e2e8f0" }} />
      </div>
    </div>
  );
}

export default function Step3Page() {
  const router = useRouter();
  const { data: business } = trpc.business.getCurrent.useQuery(undefined, { retry: false });

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("#22c55e");
  const [selectedFont, setSelectedFont] = useState<string>("modern");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const updateStep = trpc.business.updateOnboardingStep.useMutation({
    onSuccess: () => router.push("/onboarding/step-4"),
  });

  // Pre-filter and pre-select template based on business category
  useEffect(() => {
    if (business?.category && !selectedTemplate) {
      // Auto-set filter
      const matchingFilter = FILTER_CATEGORIES.find((f) => f === business.category);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (matchingFilter) setFilterCategory(matchingFilter);
      // Pre-select the best-matching template
      const match = TEMPLATES.find((t) => t.categories.includes(business.category ?? ""));
      if (match) setSelectedTemplate(match.id);
    }
  }, [business?.category, selectedTemplate]);

  const filteredTemplates =
    filterCategory && filterCategory !== "All"
      ? TEMPLATES.filter((t) => t.categories.includes(filterCategory))
      : TEMPLATES;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate) return;
    await updateStep.mutateAsync({
      step: 3,
      templateId: selectedTemplate,
      themeColor: selectedColor,
      themeFont: selectedFont,
    });
  }

  const categoryLabel = business?.category ? `Pre-filtered for ${business.category}` : "Pick a starting point — you can always change it later.";

  return (
    <OnboardingLayout currentStep={3}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="rounded-xl border p-6 shadow-sm space-y-5"
          style={{ background: C.bg, borderColor: C.border }}
        >
          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: C.text }}>
              Choose your website style
            </h1>
            <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
              {categoryLabel}
            </p>
          </div>

          {updateStep.error && (
            <div
              className="rounded-lg border p-4 text-sm font-body"
              style={{ background: C.errorBg, borderColor: C.errorBorder, color: C.error }}
            >
              {updateStep.error.message}
            </div>
          )}

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((cat) => {
              const active = filterCategory === cat || (cat === "All" && !filterCategory);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat === "All" ? "" : cat)}
                  className="rounded-full px-3 py-1 text-xs font-medium font-body border transition-colors"
                  style={
                    active
                      ? { background: C.brand, color: "#ffffff", borderColor: C.brand }
                      : { background: C.bgPage, color: C.muted, borderColor: C.border }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplate === template.id;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className="relative rounded-xl text-left transition-all overflow-hidden border-2"
                  style={
                    isSelected
                      ? { borderColor: C.brand, boxShadow: `0 0 0 2px ${C.brand}33` }
                      : { borderColor: C.border }
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = "#8b949e";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  {/* Preview placeholder */}
                  <TemplatePlaceholder accentStripe={template.accentStripe} />

                  {/* Info area */}
                  <div className="p-3" style={{ background: C.bg }}>
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-sm font-semibold font-body" style={{ color: C.text }}>
                          {template.name}
                        </p>
                        <p className="text-xs font-body mt-0.5" style={{ color: C.muted }}>
                          {template.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                          style={{ background: C.brand }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: C.border }} />
            <span className="text-xs font-body" style={{ color: C.muted }}>Customize your style</span>
            <div className="flex-1 h-px" style={{ background: C.border }} />
          </div>

          {/* Colour swatches */}
          <div className="space-y-2">
            <p className="text-sm font-medium font-body" style={{ color: C.text }}>
              Primary colour
            </p>
            <div className="flex gap-3">
              {COLOR_OPTIONS.map((c) => {
                const isActive = selectedColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColor(c.id)}
                    title={c.label}
                    className="w-8 h-8 rounded-full transition-transform"
                    style={{
                      background: c.bg,
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                      boxShadow: isActive ? `0 0 0 2px #ffffff, 0 0 0 4px ${c.bg}` : "none",
                      opacity: isActive ? 1 : 0.65,
                    }}
                    aria-label={`Select ${c.label} colour`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          </div>

          {/* Font picker — radio buttons with preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium font-body" style={{ color: C.text }}>Font style</p>
            <div className="space-y-2">
              {FONT_OPTIONS.map((f) => {
                const isActive = selectedFont === f.id;
                return (
                  <label
                    key={f.id}
                    className="flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors"
                    style={{
                      borderColor: isActive ? C.brand : C.border,
                      background: isActive ? "#f0fdf4" : C.bg,
                    }}
                  >
                    <input
                      type="radio"
                      name="font"
                      value={f.id}
                      checked={isActive}
                      onChange={() => setSelectedFont(f.id)}
                      className="sr-only"
                    />
                    {/* Custom radio dot */}
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{ borderColor: isActive ? C.brand : C.border }}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full" style={{ background: C.brand }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium font-body" style={{ color: C.text }}>
                        {f.label}
                      </span>
                      <span className="ml-2 text-xs font-body" style={{ color: C.muted }}>
                        {f.subLabel}
                      </span>
                    </div>
                    {/* Font preview */}
                    <span
                      className="text-sm"
                      style={{ ...f.previewStyle, color: C.muted }}
                    >
                      Aa
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/onboarding/step-2")}
            className="flex-1 rounded-lg border px-4 py-3 text-sm font-medium font-body transition-colors"
            style={{ borderColor: C.border, color: C.muted, background: C.bg }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = "#8b949e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={updateStep.isPending || !selectedTemplate}
            className="flex-[2] rounded-lg px-4 py-3 text-sm font-semibold text-white font-body transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            style={{ background: C.brand }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = C.brandHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.brand; }}
          >
            {updateStep.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue →
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
