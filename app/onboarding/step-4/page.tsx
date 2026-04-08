"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { trpc } from "@/lib/trpc/client";
import { Loader2, MessageSquare, Phone, Mail, User, AlignLeft, Lock, Info } from "lucide-react";

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

const FIELD_OPTIONS = [
  { id: "name", label: "Name", icon: User, required: true },
  { id: "email", label: "Email", icon: Mail, required: true },
  { id: "phone", label: "Phone", icon: Phone, required: false },
  { id: "message", label: "Message", icon: AlignLeft, required: false },
];

const PREVIEW_PLACEHOLDER: Record<string, string> = {
  name: "Your name",
  email: "you@email.com",
  phone: "(555) 000-0000",
  message: "",
};

export default function Step4Page() {
  const router = useRouter();
  const { data: business } = trpc.business.getCurrent.useQuery(undefined, { retry: false });

  const [enabledFields, setEnabledFields] = useState<string[]>(["name", "email", "phone", "message"]);
  const [notifyEmail, setNotifyEmail] = useState("");

  const updateStep = trpc.business.updateOnboardingStep.useMutation({
    onSuccess: () => router.push("/onboarding/step-5"),
  });

  useEffect(() => {
    if (business) {
      setNotifyEmail(business.email ?? "");
    }
  }, [business]);

  function toggleField(fieldId: string) {
    const field = FIELD_OPTIONS.find((f) => f.id === fieldId);
    if (field?.required) return;
    setEnabledFields((prev) =>
      prev.includes(fieldId) ? prev.filter((f) => f !== fieldId) : [...prev, fieldId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateStep.mutateAsync({
      step: 4,
      contactFormFields: enabledFields,
      contactFormNotifyEmail: notifyEmail || undefined,
    });
  }

  return (
    <OnboardingLayout currentStep={4}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: C.text }}>
            Set up your contact form
          </h1>
          <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
            When visitors contact you, what info do you need?
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

        {/* Two-panel layout: config left, preview right */}
        <div className="flex gap-4 items-start">
          {/* Left — form field config */}
          <div
            className="flex-1 rounded-xl border p-5 space-y-4 shadow-sm"
            style={{ background: C.bg, borderColor: C.border }}
          >
            <p className="text-sm font-semibold font-body" style={{ color: C.text }}>Form fields</p>
            <div className="space-y-2">
              {FIELD_OPTIONS.map((field) => {
                const Icon = field.icon;
                const isEnabled = enabledFields.includes(field.id);
                return (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => toggleField(field.id)}
                    disabled={field.required}
                    className="w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm text-left transition-colors"
                    style={{
                      borderColor: isEnabled ? `${C.brand}60` : C.border,
                      background: isEnabled ? "#f0fdf4" : C.bg,
                      cursor: field.required ? "default" : "pointer",
                    }}
                    role="switch"
                    aria-checked={isEnabled}
                    aria-label={`Toggle ${field.label} field`}
                    aria-disabled={field.required}
                  >
                    <Icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isEnabled ? C.brandText : C.muted }}
                    />
                    <span
                      className="flex-1 font-body text-sm"
                      style={{ color: isEnabled ? C.text : C.muted }}
                    >
                      {field.label}
                    </span>
                    {field.required ? (
                      <span className="flex items-center gap-1 text-xs font-body" style={{ color: C.muted }}>
                        <Lock className="w-3 h-3" />
                        Always on
                      </span>
                    ) : (
                      /* iOS-style toggle */
                      <div
                        className="relative flex-shrink-0"
                        style={{
                          width: 40,
                          height: 24,
                          borderRadius: 12,
                          background: isEnabled ? C.brand : C.border,
                          transition: "background 0.2s",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 4,
                            left: isEnabled ? 20 : 4,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "#ffffff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            transition: "left 0.2s",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Send leads to */}
            <div className="pt-3 border-t space-y-1" style={{ borderColor: C.border }}>
              <label htmlFor="notify-email" className="block text-sm font-medium font-body" style={{ color: C.text }}>
                Send leads to
              </label>
              <input
                id="notify-email"
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full rounded-lg border px-3 py-2.5 text-sm font-body outline-none transition-colors"
                style={{ borderColor: C.border, background: C.bg, color: C.text }}
                onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
              />
              <p className="text-xs font-body" style={{ color: C.muted }}>
                We'll email you when someone fills out this form.
              </p>
            </div>
          </div>

          {/* Right — live preview */}
          <div
            className="w-44 flex-shrink-0 rounded-xl border p-4 shadow-sm space-y-3 hidden sm:block"
            style={{ background: C.bgPage, borderColor: C.border }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-3.5 h-3.5" style={{ color: C.brandText }} />
              <p className="text-xs font-semibold font-body" style={{ color: C.text }}>Get in touch</p>
            </div>
            {FIELD_OPTIONS.filter((f) => enabledFields.includes(f.id)).map((field) => (
              <div key={field.id} className="space-y-0.5">
                <p className="text-xs font-body capitalize" style={{ color: C.muted }}>
                  {field.label}
                </p>
                {field.id === "message" ? (
                  <div
                    className="w-full rounded border h-10 px-2 py-1 text-xs font-body"
                    style={{ borderColor: C.border, background: C.bg, color: C.muted }}
                  >
                    Your message...
                  </div>
                ) : (
                  <div
                    className="w-full rounded border h-7 px-2 flex items-center text-xs font-body"
                    style={{ borderColor: C.border, background: C.bg, color: C.muted }}
                  >
                    {PREVIEW_PLACEHOLDER[field.id]}
                  </div>
                )}
              </div>
            ))}
            <div
              className="w-full rounded py-1.5 text-xs font-semibold text-white text-center font-body"
              style={{ background: C.brand }}
            >
              Send Message
            </div>
          </div>
        </div>

        {/* Contextual tip */}
        <div
          className="rounded-lg border-l-4 px-4 py-3 flex items-start gap-2"
          style={{ background: C.bgPage, borderLeftColor: C.brand }}
        >
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.brandText }} />
          <p className="text-xs font-body" style={{ color: C.text }}>
            <span className="font-semibold">Tip:</span> Adding a phone field gets 30% more leads from mobile visitors.
          </p>
        </div>

        {/* Footer CTAs */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/onboarding/step-3")}
            className="flex-1 rounded-lg border px-4 py-3 text-sm font-medium font-body transition-colors"
            style={{ borderColor: C.border, color: C.muted, background: C.bg }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = "#8b949e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={updateStep.isPending}
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
