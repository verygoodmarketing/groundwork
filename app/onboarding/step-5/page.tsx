"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { trpc } from "@/lib/trpc/client";
import {
  Loader2,
  Globe,
  ExternalLink,
  Copy,
  CheckCircle2,
  Rocket,
  Star,
  MapPin,
  Mail,
} from "lucide-react";

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

// ─── Confetti ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ["#22c55e", "#86efac", "#fbbf24", "#3b82f6", "#a855f7", "#ffffff"];

function useConfetti(active: boolean) {
  const [pieces, setPieces] = useState<{ id: string; style: React.CSSProperties }[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    const newPieces = Array.from({ length: 70 }, (_, i) => ({
      id: `c-${Date.now()}-${i}`,
      style: {
        position: "fixed" as const,
        pointerEvents: "none" as const,
        left: `${Math.random() * 100}vw`,
        top: `-${10 + Math.random() * 20}px`,
        width: `${6 + Math.random() * 6}px`,
        height: `${6 + Math.random() * 6}px`,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
        animationDelay: `${Math.random() * 0.6}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
        zIndex: 9999,
      } as React.CSSProperties,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 4500);
    return () => clearTimeout(timer);
  }, [active, prefersReducedMotion]);

  return { pieces, prefersReducedMotion };
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  businessName,
  siteUrl,
}: {
  businessName: string;
  siteUrl: string;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { pieces, prefersReducedMotion } = useConfetti(true);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [siteUrl]);

  return (
    <OnboardingLayout currentStep={5} hideStepper>
      {/* Confetti keyframes */}
      <style>{`
        @keyframes confettiFall {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to   { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* Confetti pieces */}
      {pieces.map(({ id, style }) => (
        <div key={id} style={style} aria-hidden="true" />
      ))}

      <div className="text-center space-y-6 py-8">
        {/* Big success icon */}
        <div className="flex justify-center">
          {prefersReducedMotion ? (
            <span className="text-5xl" role="img" aria-label="Celebration">
              🎉
            </span>
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "#f0fdf4" }}
            >
              <Rocket className="w-10 h-10" style={{ color: C.brand }} />
            </div>
          )}
        </div>

        {/* Personalized headline */}
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: C.brandText }}>
            You&apos;re live!
          </h1>
          <p className="font-body text-lg mt-2 font-medium" style={{ color: C.text }}>
            {businessName} is on the internet.
          </p>
          <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
            Your business website is published and ready for customers.
          </p>
        </div>

        {/* Live URL */}
        <div
          className="rounded-xl border p-4 space-y-2"
          style={{ background: "#f0fdf4", borderColor: "#86efac" }}
        >
          <p className="text-xs font-body font-medium" style={{ color: C.muted }}>
            Your website is live at
          </p>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 font-semibold font-body transition-colors"
            style={{ color: C.brandText }}
          >
            <Globe className="w-4 h-4" />
            {siteUrl.replace("https://", "")}
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 mx-auto text-xs font-body transition-colors"
            style={{ color: C.muted }}
          >
            {copied ? (
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.brand }} />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => router.push("/pricing")}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white font-body transition-colors"
            style={{ background: C.brand }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.brandHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.brand)}
          >
            <Star className="w-4 h-4" />
            Choose a plan — keep it live →
          </button>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold font-body transition-colors"
            style={{ borderColor: C.brand, color: C.brandText, background: C.bg }}
          >
            <Globe className="w-4 h-4" />
            View My Site
          </a>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-body transition-colors"
            style={{ color: C.muted }}
          >
            Go to Dashboard
          </button>
        </div>

        {/* What happens next */}
        <div
          className="rounded-xl border p-5 text-left space-y-3"
          style={{ background: C.bgPage, borderColor: C.border }}
        >
          <p className="text-xs font-semibold font-body uppercase tracking-wide" style={{ color: C.muted }}>
            What happens next?
          </p>
          <div className="space-y-2">
            {[
              { icon: MapPin, text: "Add your Google Business link to drive local traffic" },
              { icon: Star, text: "Set up review requests to build social proof" },
              { icon: Mail, text: "Send your first email campaign to past customers" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5">
                <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.brandText }} />
                <p className="text-sm font-body" style={{ color: C.text }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}

// ─── Step 5 main ──────────────────────────────────────────────────────────────

export default function Step5Page() {
  const router = useRouter();
  const { data: business } = trpc.business.getCurrent.useQuery(undefined, { retry: false });

  const [customDomain, setCustomDomain] = useState("");
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);

  const updateStep = trpc.business.updateOnboardingStep.useMutation({
    onSuccess: () => {
      // Auto-open the live site in a new tab on publish success
      if (siteUrl) {
        window.open(siteUrl, "_blank", "noopener,noreferrer");
      }
      setPublished(true);
    },
  });

  const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "verygoodmarketing.com";
  const siteUrl = business?.slug ? `https://${business.slug}.${SITE_DOMAIN}` : null;

  // DNS accordion — opens automatically when a domain is typed
  const showDnsInstructions = customDomain.trim().length > 0;

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    await updateStep.mutateAsync({
      step: 5,
      customDomain: customDomain || undefined,
      publish: true,
    });
  }

  if (published && siteUrl) {
    return (
      <SuccessScreen
        businessName={business?.name ?? "Your business"}
        siteUrl={siteUrl}
      />
    );
  }

  return (
    <OnboardingLayout currentStep={5}>
      <form onSubmit={handlePublish} className="space-y-6">
        <div
          className="rounded-xl border p-6 shadow-sm space-y-5"
          style={{ background: C.bg, borderColor: C.border }}
        >
          <div>
            <h1 className="font-display text-2xl font-bold" style={{ color: C.text }}>
              You&apos;re almost live!
            </h1>
            <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
              Here&apos;s your website address.
            </p>
          </div>

          {/* Error — shown after publish failure, button is re-enabled */}
          {updateStep.isError && (
            <div
              className="rounded-lg border p-4 text-sm font-body"
              style={{ background: C.errorBg, borderColor: C.errorBorder, color: C.error }}
            >
              Something went wrong. Please try again.
            </div>
          )}

          {/* Subdomain display — read-only */}
          <div className="space-y-1">
            <p className="text-sm font-medium font-body" style={{ color: C.text }}>
              Your free GroundWork URL
            </p>
            <div
              className="flex items-center rounded-lg border px-4 py-3 gap-2"
              style={{ borderColor: C.border, background: C.bgPage }}
            >
              <Globe className="w-4 h-4 flex-shrink-0" style={{ color: C.brandText }} />
              <span className="flex-1 text-sm font-mono font-medium" style={{ color: C.text }}>
                {siteUrl ? siteUrl.replace("https://", "") : "…"}
              </span>
              <button
                type="button"
                onClick={() => siteUrl && handleCopy(siteUrl)}
                className="flex items-center gap-1 text-xs font-body transition-colors"
                style={{ color: C.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                aria-label="Copy site URL"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4" style={{ color: C.brand }} />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              {siteUrl && (
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: C.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                  aria-label="Open site in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Custom domain — accordion auto-opens when domain typed */}
          <div className="space-y-3">
            <p className="text-sm font-medium font-body" style={{ color: C.text }}>
              Use your own domain{" "}
              <span className="font-normal text-xs" style={{ color: C.muted }}>(optional)</span>
            </p>
            <div
              className="flex items-center rounded-lg border overflow-hidden transition-colors focus-within:ring-2"
              style={{ borderColor: customDomain ? C.borderFocus : C.border, background: C.bg }}
            >
              <span
                className="px-3 py-3 text-sm font-body border-r whitespace-nowrap"
                style={{ borderColor: C.border, color: C.muted, background: C.bgPage }}
              >
                https://
              </span>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-3 py-3 text-sm font-body outline-none"
                style={{ background: "transparent", color: C.text }}
              />
            </div>

            {/* DNS instructions — appear automatically when domain is entered */}
            {showDnsInstructions && (
              <div
                className="rounded-lg border p-4 space-y-3 text-sm font-body"
                style={{ background: C.bgPage, borderColor: C.border }}
              >
                <p className="font-semibold" style={{ color: C.text }}>DNS setup</p>
                <p className="text-xs" style={{ color: C.muted }}>
                  Add this CNAME record in your domain registrar:
                </p>
                <div
                  className="rounded border p-3 font-mono text-xs space-y-1"
                  style={{ borderColor: C.border, background: C.bg }}
                >
                  <div className="grid grid-cols-3 gap-2 font-semibold" style={{ color: C.muted }}>
                    <span>Type</span><span>Name</span><span>Points to</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2" style={{ color: C.text }}>
                    <span>CNAME</span><span>@ or www</span><span>sites.groundworklocal.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy("sites.groundworklocal.com")}
                    className="text-xs font-body border rounded px-2 py-1 transition-colors"
                    style={{ borderColor: C.border, color: C.muted, background: C.bg }}
                  >
                    Copy CNAME
                  </button>
                  <a
                    href="/help/custom-domain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-body"
                    style={{ color: C.brandText }}
                  >
                    Learn how →
                  </a>
                </div>
                <p className="text-xs flex items-center gap-1" style={{ color: C.muted }}>
                  ℹ️ DNS changes can take up to 24 hours to propagate.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Publish CTA */}
        <button
          type="submit"
          disabled={updateStep.isPending}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-4 text-base font-bold text-white font-body transition-colors disabled:opacity-50"
          style={{ background: C.brand }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = C.brandHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = C.brand; }}
        >
          {updateStep.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Launching...
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Publish My Site
            </>
          )}
        </button>
        {siteUrl && (
          <p className="text-center text-xs font-body" style={{ color: C.muted }}>
            Your site will be live at {siteUrl.replace("https://", "")}
          </p>
        )}

        {/* Back — inline at bottom-left per wireframe */}
        <div>
          <button
            type="button"
            onClick={() => router.push("/onboarding/step-4")}
            className="text-sm font-body transition-colors"
            style={{ color: C.muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            ← Back
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
