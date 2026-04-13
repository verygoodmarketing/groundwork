/**
 * Email template constants for the Groundwork trial lifecycle sequence.
 *
 * All copy is sourced from the CMO's trial-activation-emails document (VER-69).
 * Do NOT hardcode copy here — modify the CMO document first, then update these constants.
 *
 * Template data substitution is done at send time via `sendEmail()`.
 */

export type EmailTemplate =
  | "onboarding_nudge_24h"
  | "onboarding_nudge_72h"
  | "day7_mid_trial"
  | "day12_urgency"
  | "trial_expired"
  | "post_conversion_welcome";

export interface TemplateData {
  firstName: string;
  appUrl?: string;
  pricingUrl?: string;
  trialExpiryDate?: string;
  planPrice?: string;
}

export interface EmailContent {
  subject: string;
  text: string;
  html: string;
}

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://app.verygoodmarketing.com";
}

function getPricingUrl(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.verygoodmarketing.com";
  return `${base}/pricing`;
}

export function buildEmailContent(
  template: EmailTemplate,
  data: TemplateData
): EmailContent {
  const appUrl = data.appUrl ?? getAppUrl();
  const pricingUrl = data.pricingUrl ?? getPricingUrl();
  const { firstName, trialExpiryDate, planPrice = "$49" } = data;

  switch (template) {
    case "onboarding_nudge_24h":
      return {
        subject: "You started something — let's finish it",
        text: `Hi ${firstName},

You signed up for Groundwork yesterday — nice. But your site isn't live yet.

It only takes a few minutes to get your business online. Here's where you left off:

Continue Setup → ${appUrl}/onboarding

Once your site is live, local customers can find you. Every day offline is a day a competitor gets that customer instead.

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>You signed up for Groundwork yesterday — nice. But your site isn't live yet.</p>
<p>It only takes a few minutes to get your business online. Here's where you left off:</p>
<p><a href="${appUrl}/onboarding"><strong>Continue Setup →</strong></a></p>
<p>Once your site is live, local customers can find you. Every day offline is a day a competitor gets that customer instead.</p>
<p>— The Groundwork Team</p>`,
      };

    case "onboarding_nudge_72h":
      return {
        subject: "Your free site is waiting. Don't let it expire.",
        text: `Hi ${firstName},

Three days ago you started building your Groundwork site.

You have 11 days left in your free trial — but your site still isn't live.

Getting online is the single highest-ROI thing you can do for your business this week. Customers search for you. If they don't find you, they find someone else.

Finish My Setup → ${appUrl}/onboarding

Need help? Reply to this email.

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>Three days ago you started building your Groundwork site.</p>
<p>You have 11 days left in your free trial — but your site still isn't live.</p>
<p>Getting online is the single highest-ROI thing you can do for your business this week. Customers search for you. If they don't find you, they find someone else.</p>
<p><a href="${appUrl}/onboarding"><strong>Finish My Setup →</strong></a></p>
<p>Need help? Reply to this email.</p>
<p>— The Groundwork Team</p>`,
      };

    case "day7_mid_trial":
      return {
        subject: "You're halfway through your trial. Here's what you get with Pro.",
        text: `Hi ${firstName},

You've had Groundwork for a week. Your site is live.

You're halfway through your 14-day trial. Here's what happens on day 14:

Free plan: Your site stays live with Groundwork branding. Lead capture, email marketing, and review requests are paused.

Pro plan (${planPrice}/mo): Everything stays on. No Groundwork branding. Leads keep coming in. Reviews keep getting collected. Your email list keeps growing.

Most of our customers upgrade because they don't want to lose the leads they've already captured.

Upgrade to Pro — ${planPrice}/mo → ${pricingUrl}

No pressure — but now you know what's at stake.

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>You've had Groundwork for a week. Your site is live.</p>
<p>You're halfway through your 14-day trial. Here's what happens on day 14:</p>
<p><strong>Free plan:</strong> Your site stays live with Groundwork branding. Lead capture, email marketing, and review requests are paused.</p>
<p><strong>Pro plan (${planPrice}/mo):</strong> Everything stays on. No Groundwork branding. Leads keep coming in. Reviews keep getting collected. Your email list keeps growing.</p>
<p>Most of our customers upgrade because they don't want to lose the leads they've already captured.</p>
<p><a href="${pricingUrl}"><strong>Upgrade to Pro — ${planPrice}/mo →</strong></a></p>
<p>No pressure — but now you know what's at stake.</p>
<p>— The Groundwork Team</p>`,
      };

    case "day12_urgency":
      return {
        subject: "2 days left — upgrade to keep your site live",
        text: `Hi ${firstName},

Your Groundwork trial expires in 2 days.

If you don't upgrade by ${trialExpiryDate ?? "soon"}, your lead capture, email marketing, and review requests will pause.

Don't lose what you've built.

What you'll keep on Pro:
- Your live website (no Groundwork branding)
- All leads captured so far
- Automated review requests
- Email marketing to your list
- Local SEO tools

Upgrade Now — ${planPrice}/mo → ${pricingUrl}

Questions about pricing? Reply and I'll help.

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>Your Groundwork trial expires in <strong>2 days</strong>.</p>
<p>If you don't upgrade by ${trialExpiryDate ?? "soon"}, your lead capture, email marketing, and review requests will pause.</p>
<p>Don't lose what you've built.</p>
<p><strong>What you'll keep on Pro:</strong></p>
<ul>
<li>Your live website (no Groundwork branding)</li>
<li>All leads captured so far</li>
<li>Automated review requests</li>
<li>Email marketing to your list</li>
<li>Local SEO tools</li>
</ul>
<p><a href="${pricingUrl}"><strong>Upgrade Now — ${planPrice}/mo →</strong></a></p>
<p>Questions about pricing? Reply and I'll help.</p>
<p>— The Groundwork Team</p>`,
      };

    case "trial_expired":
      return {
        subject: "Your Groundwork trial has ended",
        text: `Hi ${firstName},

Your Groundwork free trial has ended.

Your site is still live, but lead capture, email marketing, and review requests are paused.

Don't lose what you've built — upgrade to Pro to re-activate everything.

Upgrade Now → ${pricingUrl}

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>Your Groundwork free trial has ended.</p>
<p>Your site is still live, but lead capture, email marketing, and review requests are paused.</p>
<p>Don't lose what you've built — upgrade to Pro to re-activate everything.</p>
<p><a href="${pricingUrl}"><strong>Upgrade Now →</strong></a></p>
<p>— The Groundwork Team</p>`,
      };

    case "post_conversion_welcome":
      return {
        subject: "You're on Pro. Here's what to do now.",
        text: `Hi ${firstName},

You're in. Welcome to Groundwork Pro.

Your site is fully live, your leads are flowing, and your reviews are on autopilot.

Make the most of your plan this week:

1. Launch your first email campaign. You have a list — use it. Go to Email → New Campaign. Takes 10 minutes.

2. Check your leads dashboard. See who's contacted you through your site. Follow up fast — leads go cold quick.

3. Verify your Google Business Profile. This is the single biggest thing you can do for local search visibility. Go to SEO → Google Profile.

Go to My Dashboard → ${appUrl}/dashboard

Thank you for trusting Groundwork with your business.

— The Groundwork Team`,
        html: `<p>Hi ${firstName},</p>
<p>You're in. Welcome to Groundwork Pro.</p>
<p>Your site is fully live, your leads are flowing, and your reviews are on autopilot.</p>
<p><strong>Make the most of your plan this week:</strong></p>
<p><strong>1. Launch your first email campaign.</strong> You have a list — use it. Go to Email → New Campaign. Takes 10 minutes.</p>
<p><strong>2. Check your leads dashboard.</strong> See who's contacted you through your site. Follow up fast — leads go cold quick.</p>
<p><strong>3. Verify your Google Business Profile.</strong> This is the single biggest thing you can do for local search visibility. Go to SEO → Google Profile.</p>
<p><a href="${appUrl}/dashboard"><strong>Go to My Dashboard →</strong></a></p>
<p>Thank you for trusting Groundwork with your business.</p>
<p>— The Groundwork Team</p>`,
      };

    default: {
      const _exhaustive: never = template;
      throw new Error(`Unknown email template: ${_exhaustive}`);
    }
  }
}
