"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Copy, Check, MessageSquare, Mail } from "lucide-react";

/**
 * ReferralCard — shown in the dashboard after 7+ days of account activity.
 *
 * CMO copy from spec:
 * - Headline: "Know another pro who could use more customers?"
 * - Subhead: "Share GroundWork with a fellow tradesperson. You both get a free month when they sign up."
 * - Button: "Get My Referral Link"
 *
 * Surfaces the user's unique referral link, a copy-to-clipboard button,
 * and pre-written share options (SMS, email).
 * Also shows referral history: referred, converted, rewarded.
 */
export function ReferralCard() {
  const [copied, setCopied] = useState(false);

  const { data: codeData, isLoading: codeLoading } = trpc.referral.getMyCode.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.referral.getStats.useQuery();

  const isLoading = codeLoading || statsLoading;

  // Spec: show after 7+ days of account activity
  if (!isLoading && stats && stats.daysSinceCreated < 7) {
    return null;
  }

  async function handleCopy() {
    if (!codeData?.url) return;
    try {
      await navigator.clipboard.writeText(codeData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select input text
    }
  }

  function getSmsShareUrl() {
    if (!codeData?.url) return "#";
    const msg = encodeURIComponent(
      `Hey, I use GroundWork to get more customers online. It's $39/mo — use my link and we both get a free month. ${codeData.url}`
    );
    return `sms:?body=${msg}`;
  }

  function getEmailShareUrl() {
    if (!codeData?.url) return "#";
    const subject = encodeURIComponent(
      "A tool that's been getting me more work — wanted to share"
    );
    const body = encodeURIComponent(
      `I've been using a tool called GroundWork to help manage my online presence — website, reviews, leads. It's been worth it.\n\nI figured you might want to try it. Use my referral link and you'll get your first month free after your trial. I'll get a free month too, so it's a win for both of us.\n\n${codeData.url}\n\nNo pressure — just thought it'd be useful if you're trying to pick up more work online.`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <div className="rounded-xl border border-surface-700 bg-surface-900/50 p-6 space-y-5">
      {/* Header — CMO copy */}
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--foreground)]">
          Know another pro who could use more customers?
        </h2>
        <p className="text-surface-400 font-body text-sm mt-1">
          Share GroundWork with a fellow tradesperson. You both get a free month when they sign up.
        </p>
      </div>

      {/* Referral link + copy button */}
      {isLoading ? (
        <div className="h-12 rounded-lg bg-surface-800 animate-pulse" />
      ) : codeData ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-surface-700 bg-surface-800 px-4 py-2.5 text-sm font-mono text-surface-300 truncate select-all">
            {codeData.url}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-surface-700 bg-surface-800 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-surface-500 transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-brand-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy link
              </>
            )}
          </button>
        </div>
      ) : null}

      {/* Share options */}
      <div className="flex gap-3">
        <a
          href={getSmsShareUrl()}
          className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-800 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-surface-500 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-brand-400" />
          Send SMS
        </a>
        <a
          href={getEmailShareUrl()}
          className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-800 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-surface-500 transition-colors"
        >
          <Mail className="w-4 h-4 text-brand-400" />
          Send email
        </a>
      </div>

      {/* Referral history */}
      {!statsLoading && stats && (stats.total > 0) && (
        <div className="border-t border-surface-700 pt-4 grid grid-cols-3 gap-4 text-sm font-body">
          <div>
            <p className="text-surface-400">Referred</p>
            <p className="text-[var(--foreground)] font-semibold mt-0.5">{stats.total}</p>
          </div>
          <div>
            <p className="text-surface-400">Converted</p>
            <p className="text-[var(--foreground)] font-semibold mt-0.5">{stats.converted}</p>
          </div>
          <div>
            <p className="text-surface-400">Credits earned</p>
            <p className="text-brand-400 font-semibold mt-0.5">
              {stats.rewarded > 0 ? `${stats.rewarded} × free month` : "—"}
            </p>
          </div>
        </div>
      )}

      {/* Fine print */}
      <p className="text-xs text-surface-500 font-body">
        Your friend gets their first paid month free. You get a free month when they activate. One credit per unique referral.
      </p>
    </div>
  );
}
