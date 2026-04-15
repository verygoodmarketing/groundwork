/**
 * Email template constants for the GroundWork trial lifecycle sequence and
 * the Very Good Marketing trial nurture sequence (VER-145/VER-150).
 *
 * All copy is sourced from the CMO's trial-activation-emails document (VER-69)
 * and the trial nurture sequence document (VER-145).
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
  | "post_conversion_welcome"
  // Very Good Marketing trial nurture sequence (VER-145)
  | "vgm_nurture_day1"
  | "vgm_nurture_day3"
  | "vgm_nurture_day7"
  | "vgm_nurture_day14"
  | "vgm_paid_welcome"
  // Post-paid onboarding sequence (VER-242)
  | "onboarding_paid_day1"
  | "onboarding_paid_day3"
  | "onboarding_paid_day7";

export interface TemplateData {
  firstName: string;
  appUrl?: string;
  pricingUrl?: string;
  trialExpiryDate?: string;
  planPrice?: string;
  /** Founder name shown in email sign-offs (pulled from FOUNDER_NAME env var by default) */
  founderName?: string;
  /** Days remaining in trial — used for [X days] merge tag in Day 14 email */
  daysRemaining?: number;
  /** Unsubscribe URL — required for CAN-SPAM compliance */
  unsubscribeUrl?: string;
  /** Customer's unique referral URL — used in post-paid Day 7 email */
  referralLink?: string;
  /** Direct link to customer dashboard — used in post-paid onboarding emails */
  dashboardUrl?: string;
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

function getFounderName(): string {
  return process.env.FOUNDER_NAME ?? "The Very Good Marketing Team";
}

/** Build a plain-text unsubscribe footer line. */
function buildUnsubscribeText(unsubscribeUrl: string): string {
  return `\n\n---\nTo stop receiving these emails, unsubscribe here: ${unsubscribeUrl}`;
}

/** Build an HTML unsubscribe footer block. */
function buildUnsubscribeHtml(unsubscribeUrl: string): string {
  return `<hr style="margin-top:40px;border:none;border-top:1px solid #e0e0e0;" />
<p style="font-size:12px;color:#888;text-align:center;">
  <a href="${unsubscribeUrl}" style="color:#888;">Unsubscribe</a> from these emails.
  Very Good Marketing · All rights reserved.
</p>`;
}

/**
 * Wrap email body HTML in a branded layout featuring the Groundwork logo,
 * a consistent card container, and a footer copyright line.
 */
function wrapInBrandedLayout(bodyHtml: string, appUrl: string): string {
  return `<div style="font-family:Inter,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
  <div style="padding:24px 32px 16px;border-bottom:1px solid #e5e7eb;">
    <a href="${appUrl}"><img src="${appUrl}/groundwork-logo-email.png" alt="Groundwork" width="160" style="display:block;" /></a>
  </div>
  <div style="padding:32px;">${bodyHtml}</div>
  <div style="padding:16px 32px;border-top:1px solid #e5e7eb;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">You're receiving this because you signed up for Groundwork. &copy; Groundwork</p>
  </div>
</div>`;
}

export function buildEmailContent(
  template: EmailTemplate,
  data: TemplateData
): EmailContent {
  const appUrl = data.appUrl ?? getAppUrl();
  const pricingUrl = data.pricingUrl ?? getPricingUrl();
  const founderName = data.founderName ?? getFounderName();
  const unsubscribeUrl = data.unsubscribeUrl ?? `${getAppUrl()}/unsubscribe`;
  const unsubText = buildUnsubscribeText(unsubscribeUrl);
  const unsubHtml = buildUnsubscribeHtml(unsubscribeUrl);
  const { firstName, trialExpiryDate, planPrice = "$49", daysRemaining } = data;

  switch (template) {
    case "onboarding_nudge_24h":
      return {
        subject: "You started something — let's finish it",
        text: `Hi ${firstName},

You signed up for GroundWork yesterday — nice. But your site isn't live yet.

It only takes a few minutes to get your business online. Here's where you left off:

Continue Setup → ${appUrl}/onboarding

Once your site is live, local customers can find you. Every day offline is a day a competitor gets that customer instead.

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>You signed up for GroundWork yesterday — nice. But your site isn't live yet.</p>
<p>It only takes a few minutes to get your business online. Here's where you left off:</p>
<p><a href="${appUrl}/onboarding"><strong>Continue Setup →</strong></a></p>
<p>Once your site is live, local customers can find you. Every day offline is a day a competitor gets that customer instead.</p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    case "onboarding_nudge_72h":
      return {
        subject: "Your free site is waiting. Don't let it expire.",
        text: `Hi ${firstName},

Three days ago you started building your GroundWork site.

You have 11 days left in your free trial — but your site still isn't live.

Getting online is the single highest-ROI thing you can do for your business this week. Customers search for you. If they don't find you, they find someone else.

Finish My Setup → ${appUrl}/onboarding

Need help? Reply to this email.

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>Three days ago you started building your GroundWork site.</p>
<p>You have 11 days left in your free trial — but your site still isn't live.</p>
<p>Getting online is the single highest-ROI thing you can do for your business this week. Customers search for you. If they don't find you, they find someone else.</p>
<p><a href="${appUrl}/onboarding"><strong>Finish My Setup →</strong></a></p>
<p>Need help? Reply to this email.</p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    case "day7_mid_trial":
      return {
        subject: "You're halfway through your trial. Here's what you get with Pro.",
        text: `Hi ${firstName},

You've had GroundWork for a week. Your site is live.

You're halfway through your 14-day trial. Here's what happens on day 14:

Free plan: Your site stays live with GroundWork branding. Lead capture, email marketing, and review requests are paused.

Pro plan (${planPrice}/mo): Everything stays on. No GroundWork branding. Leads keep coming in. Reviews keep getting collected. Your email list keeps growing.

Most of our customers upgrade because they don't want to lose the leads they've already captured.

Upgrade to Pro — ${planPrice}/mo → ${pricingUrl}

No pressure — but now you know what's at stake.

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>You've had GroundWork for a week. Your site is live.</p>
<p>You're halfway through your 14-day trial. Here's what happens on day 14:</p>
<p><strong>Free plan:</strong> Your site stays live with GroundWork branding. Lead capture, email marketing, and review requests are paused.</p>
<p><strong>Pro plan (${planPrice}/mo):</strong> Everything stays on. No GroundWork branding. Leads keep coming in. Reviews keep getting collected. Your email list keeps growing.</p>
<p>Most of our customers upgrade because they don't want to lose the leads they've already captured.</p>
<p><a href="${pricingUrl}"><strong>Upgrade to Pro — ${planPrice}/mo →</strong></a></p>
<p>No pressure — but now you know what's at stake.</p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    case "day12_urgency":
      return {
        subject: "2 days left — upgrade to keep your site live",
        text: `Hi ${firstName},

Your GroundWork trial expires in 2 days.

If you don't upgrade by ${trialExpiryDate ?? "soon"}, your lead capture, email marketing, and review requests will pause.

Don't lose what you've built.

What you'll keep on Pro:
- Your live website (no GroundWork branding)
- All leads captured so far
- Automated review requests
- Email marketing to your list
- Local SEO tools

Upgrade Now — ${planPrice}/mo → ${pricingUrl}

Questions about pricing? Reply and I'll help.

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>Your GroundWork trial expires in <strong>2 days</strong>.</p>
<p>If you don't upgrade by ${trialExpiryDate ?? "soon"}, your lead capture, email marketing, and review requests will pause.</p>
<p>Don't lose what you've built.</p>
<p><strong>What you'll keep on Pro:</strong></p>
<ul>
<li>Your live website (no GroundWork branding)</li>
<li>All leads captured so far</li>
<li>Automated review requests</li>
<li>Email marketing to your list</li>
<li>Local SEO tools</li>
</ul>
<p><a href="${pricingUrl}"><strong>Upgrade Now — ${planPrice}/mo →</strong></a></p>
<p>Questions about pricing? Reply and I'll help.</p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    case "trial_expired":
      return {
        subject: "Your GroundWork trial has ended",
        text: `Hi ${firstName},

Your GroundWork free trial has ended.

Your site is still live, but lead capture, email marketing, and review requests are paused.

Don't lose what you've built — upgrade to Pro to re-activate everything.

Upgrade Now → ${pricingUrl}

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>Your GroundWork free trial has ended.</p>
<p>Your site is still live, but lead capture, email marketing, and review requests are paused.</p>
<p>Don't lose what you've built — upgrade to Pro to re-activate everything.</p>
<p><a href="${pricingUrl}"><strong>Upgrade Now →</strong></a></p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    case "post_conversion_welcome":
      return {
        subject: "You're on Pro. Here's what to do now.",
        text: `Hi ${firstName},

You're in. Welcome to GroundWork Pro.

Your site is fully live, your leads are flowing, and your reviews are on autopilot.

Make the most of your plan this week:

1. Launch your first email campaign. You have a list — use it. Go to Email → New Campaign. Takes 10 minutes.

2. Check your leads dashboard. See who's contacted you through your site. Follow up fast — leads go cold quick.

3. Verify your Google Business Profile. This is the single biggest thing you can do for local search visibility. Go to SEO → Google Profile.

Go to My Dashboard → ${appUrl}/dashboard

Thank you for trusting GroundWork with your business.

— The GroundWork Team`,
        html: wrapInBrandedLayout(`<p>Hi ${firstName},</p>
<p>You're in. Welcome to GroundWork Pro.</p>
<p>Your site is fully live, your leads are flowing, and your reviews are on autopilot.</p>
<p><strong>Make the most of your plan this week:</strong></p>
<p><strong>1. Launch your first email campaign.</strong> You have a list — use it. Go to Email → New Campaign. Takes 10 minutes.</p>
<p><strong>2. Check your leads dashboard.</strong> See who's contacted you through your site. Follow up fast — leads go cold quick.</p>
<p><strong>3. Verify your Google Business Profile.</strong> This is the single biggest thing you can do for local search visibility. Go to SEO → Google Profile.</p>
<p><a href="${appUrl}/dashboard"><strong>Go to My Dashboard →</strong></a></p>
<p>Thank you for trusting GroundWork with your business.</p>
<p>— The GroundWork Team</p>`, appUrl),
      };

    // ────────────────────────────────────────────────────────────────────────
    // Very Good Marketing trial nurture sequence (VER-145)
    // ────────────────────────────────────────────────────────────────────────

    case "vgm_nurture_day1":
      return {
        subject: "You're in. Here's what to do first.",
        text: `Hey ${firstName},

Welcome to Very Good Marketing — really glad you're here.

You signed up because you want more customers finding your business online. That's exactly what we're going to help you do.

But here's the honest truth: most people sign up, poke around for 10 minutes, and don't come back. I don't want that for you.

So let me make day one dead simple.

Your one job today: get your business profile set up.

This takes about 5 minutes and it's the foundation of everything else — your website, your leads, your Google ranking. Without it, nothing else works right.

Set Up Your Business Profile Now → ${appUrl}/onboarding

Once that's done, you'll be ready for step two (which I'll walk you through in a couple days).

Any questions, just reply to this email. I read every one.

— ${founderName}
Very Good Marketing

P.S. If you run into anything confusing, hit reply and tell me. Seriously. Your feedback makes the product better.${unsubText}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>Welcome to Very Good Marketing — really glad you're here.</p>
<p>You signed up because you want more customers finding your business online. That's exactly what we're going to help you do.</p>
<p>But here's the honest truth: most people sign up, poke around for 10 minutes, and don't come back. I don't want that for you.</p>
<p>So let me make day one dead simple.</p>
<p><strong>Your one job today: get your business profile set up.</strong></p>
<p>This takes about 5 minutes and it's the foundation of everything else — your website, your leads, your Google ranking. Without it, nothing else works right.</p>
<p><a href="${appUrl}/onboarding"><strong>Set Up Your Business Profile Now →</strong></a></p>
<p>Once that's done, you'll be ready for step two (which I'll walk you through in a couple days).</p>
<p>Any questions, just reply to this email. I read every one.</p>
<p>— ${founderName}<br>Very Good Marketing</p>
<p><em>P.S. If you run into anything confusing, hit reply and tell me. Seriously. Your feedback makes the product better.</em></p>
${unsubHtml}`, appUrl),
      };

    case "vgm_nurture_day3":
      return {
        subject: "Did you get your first lead yet?",
        text: `Hey ${firstName},

Quick check-in.

If you set up your profile on day one — nice work. You're already ahead of most people.

If you haven't yet, no stress. Here's why it matters: right now, when someone in your area searches for your service, your competitors are showing up and you're not. Let's fix that.

Here's what actually gets you found:

1. Your business profile is complete — name, services, phone, area covered
2. Your website is live — even a simple one-pager beats nothing
3. You're capturing leads — a contact form or click-to-call button

All three of these take under 30 minutes on Very Good Marketing. And once they're live, they work for you while you're out on jobs.

Finish Your Setup — Takes 30 Minutes → ${appUrl}/onboarding

Tomorrow you get up and go to work. Your website is out there finding customers for you. That's the idea.

Talk soon,

— ${founderName}

P.S. I've seen this work for a cleaning crew who went from 0 to 12 new monthly leads in their first 30 days. Setup was the unlock.${unsubText}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>Quick check-in.</p>
<p>If you set up your profile on day one — nice work. You're already ahead of most people.</p>
<p>If you haven't yet, no stress. Here's why it matters: right now, when someone in your area searches for your service, your competitors are showing up and you're not. Let's fix that.</p>
<p><strong>Here's what actually gets you found:</strong></p>
<ol>
<li><strong>Your business profile is complete</strong> — name, services, phone, area covered</li>
<li><strong>Your website is live</strong> — even a simple one-pager beats nothing</li>
<li><strong>You're capturing leads</strong> — a contact form or click-to-call button</li>
</ol>
<p>All three of these take under 30 minutes on Very Good Marketing. And once they're live, they work for you while you're out on jobs.</p>
<p><a href="${appUrl}/onboarding"><strong>Finish Your Setup — Takes 30 Minutes →</strong></a></p>
<p>Tomorrow you get up and go to work. Your website is out there finding customers for you. That's the idea.</p>
<p>Talk soon,</p>
<p>— ${founderName}</p>
<p><em>P.S. I've seen this work for a cleaning crew who went from 0 to 12 new monthly leads in their first 30 days. Setup was the unlock.</em></p>
${unsubHtml}`, appUrl),
      };

    case "vgm_nurture_day7":
      return {
        subject: "One week in — here's what's working",
        text: `Hey ${firstName},

You've been on the platform for a week. I want to show you something.

Every time someone in your area searches for the services you offer, your business has a chance to show up. If you've set up your profile and got your site live — that's already happening.

Here's what our customers typically see by week two:
- First Google impressions from local search
- Website visits from people looking for exactly what they do
- At least one inquiry through their contact form or click-to-call

If you're not seeing that yet, it usually comes down to one thing: your service keywords aren't fully filled in. Worth a 2-minute check.

Check Your Keyword Setup → ${appUrl}/dashboard/settings

---

I also want to tell you about the review request tool.

For service businesses, reviews are everything. One extra Google review a week compounds fast. Our review request tool sends a quick text to your customers after a job — most of them tap the link and leave a review before they even get home.

If you haven't turned it on yet: ${appUrl}/dashboard/reviews

A business with 50 reviews beats a business with 5 every time, even if the service is identical.

— ${founderName}

P.S. Still have questions? Reply here or book a 15-minute call — I personally do onboarding calls for new customers.${unsubText}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>You've been on the platform for a week. I want to show you something.</p>
<p>Every time someone in your area searches for the services you offer, your business has a chance to show up. If you've set up your profile and got your site live — that's already happening.</p>
<p><strong>Here's what our customers typically see by week two:</strong></p>
<ul>
<li>First Google impressions from local search</li>
<li>Website visits from people looking for exactly what they do</li>
<li>At least one inquiry through their contact form or click-to-call</li>
</ul>
<p>If you're not seeing that yet, it usually comes down to one thing: your service keywords aren't fully filled in. Worth a 2-minute check.</p>
<p><a href="${appUrl}/dashboard/settings"><strong>Check Your Keyword Setup →</strong></a></p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
<p>I also want to tell you about the review request tool.</p>
<p>For service businesses, reviews are everything. One extra Google review a week compounds fast. Our review request tool sends a quick text to your customers after a job — most of them tap the link and leave a review before they even get home.</p>
<p>If you haven't turned it on yet: <a href="${appUrl}/dashboard/reviews"><strong>Activate Review Requests →</strong></a></p>
<p>A business with 50 reviews beats a business with 5 every time, even if the service is identical.</p>
<p>— ${founderName}</p>
<p><em>P.S. Still have questions? Reply here or book a 15-minute call — I personally do onboarding calls for new customers.</em></p>
${unsubHtml}`, appUrl),
      };

    case "vgm_nurture_day14": {
      const daysLabel =
        daysRemaining !== undefined
          ? daysRemaining === 1
            ? "1 day"
            : `${daysRemaining} days`
          : "soon";
      return {
        subject: "Your trial ends soon — here's what you'll lose",
        text: `Hey ${firstName},

Your free trial ends in ${daysLabel}.

I'm not going to pretend that's not coming. But I do want to be straight with you about what that actually means.

When your trial ends, here's what pauses:
- Your website goes offline
- New leads stop coming in through your contact form
- Your local SEO presence disappears from search
- Review request automations stop sending

Everything you've built — your profile, your content, your lead funnel — gets put on hold.

Here's what it costs to keep it running: ${planPrice}/month

For most service businesses, one new customer more than covers it. If you got even a single job from your listing this month, you're already ahead.

Keep My Account Active — Upgrade Now → ${pricingUrl}

---

If you're on the fence, I get it. Here's my honest pitch:

You started this trial because you wanted more customers finding you online. That's a real problem and it doesn't fix itself. Every month you're not visible online, your competitors are building a lead on you.

Very Good Marketing is the fastest, simplest way to get found — built specifically for businesses like yours.

If now isn't the right time, just reply and tell me. I'd rather know than lose you quietly.

— ${founderName}

P.S. Questions about pricing or what's included? Reply here and I'll give you a straight answer.${unsubText}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>Your free trial ends in <strong>${daysLabel}</strong>.</p>
<p>I'm not going to pretend that's not coming. But I do want to be straight with you about what that actually means.</p>
<p><strong>When your trial ends, here's what pauses:</strong></p>
<ul>
<li>Your website goes offline</li>
<li>New leads stop coming in through your contact form</li>
<li>Your local SEO presence disappears from search</li>
<li>Review request automations stop sending</li>
</ul>
<p>Everything you've built — your profile, your content, your lead funnel — gets put on hold.</p>
<p><strong>Here's what it costs to keep it running: ${planPrice}/month</strong></p>
<p>For most service businesses, one new customer more than covers it. If you got even a single job from your listing this month, you're already ahead.</p>
<p><a href="${pricingUrl}"><strong>Keep My Account Active — Upgrade Now →</strong></a></p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
<p>If you're on the fence, I get it. Here's my honest pitch:</p>
<p>You started this trial because you wanted more customers finding you online. That's a real problem and it doesn't fix itself. Every month you're not visible online, your competitors are building a lead on you.</p>
<p>Very Good Marketing is the fastest, simplest way to get found — built specifically for businesses like yours.</p>
<p>If now isn't the right time, just reply and tell me. I'd rather know than lose you quietly.</p>
<p>— ${founderName}</p>
<p><em>P.S. Questions about pricing or what's included? Reply here and I'll give you a straight answer.</em></p>
${unsubHtml}`, appUrl),
      };
    }

    case "vgm_paid_welcome":
      return {
        subject: "You're in. Welcome to Very Good Marketing.",
        text: `Hey ${firstName},

You upgraded — welcome aboard.

Your website is live, your leads are flowing, and your review requests are on autopilot. Here's what to focus on this week:

1. Complete your business profile if you haven't already. The more detail you add, the better your local search visibility.

2. Check your leads dashboard. See who's contacted you. Follow up fast — leads go cold quick.

3. Turn on review requests. Send a quick text to recent customers and watch your Google reviews grow.

Go to Your Dashboard → ${appUrl}/dashboard

Thank you for trusting Very Good Marketing with your business.

— ${founderName}
Very Good Marketing${unsubText}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>You upgraded — welcome aboard.</p>
<p>Your website is live, your leads are flowing, and your review requests are on autopilot. Here's what to focus on this week:</p>
<p><strong>1. Complete your business profile</strong> if you haven't already. The more detail you add, the better your local search visibility.</p>
<p><strong>2. Check your leads dashboard.</strong> See who's contacted you. Follow up fast — leads go cold quick.</p>
<p><strong>3. Turn on review requests.</strong> Send a quick text to recent customers and watch your Google reviews grow.</p>
<p><a href="${appUrl}/dashboard"><strong>Go to Your Dashboard →</strong></a></p>
<p>Thank you for trusting Very Good Marketing with your business.</p>
<p>— ${founderName}<br>Very Good Marketing</p>
${unsubHtml}`, appUrl),
      };

    // ────────────────────────────────────────────────────────────────────────
    // Post-paid onboarding sequence (VER-242)
    // Sent to customers who have upgraded to a paid Groundwork plan.
    // Copy sourced from VER-236#document-email-copy (CMO).
    // ────────────────────────────────────────────────────────────────────────

    case "onboarding_paid_day1": {
      const dashboardUrl = data.dashboardUrl ?? `${appUrl}/dashboard`;
      return {
        subject: `${firstName}, you're up and running — 3 things to do today`,
        text: `Hey ${firstName},

You just upgraded — and your professional website is live.

That's a big deal. Most contractors in your area still don't have one. Now you do.

Here are 3 quick things to do in the next 24 hours to make sure it's working for you:

1. Add your logo (or business name graphic)
Your logo is the first thing customers see. Even a clean text-based logo looks 10x more professional than a blank header.
→ Go to Site Customizer: ${dashboardUrl}

2. Pick your brand colors
Match your truck, your uniform, or just pick something you like. It takes 30 seconds and makes your site feel like yours.
→ Open Color Settings: ${dashboardUrl}

3. Copy your website link and share it
Send it to a few contacts. Post it on your Facebook. Add it to your email signature. The sooner it's out there, the sooner it starts working.
→ Copy My Website Link: ${dashboardUrl}

That's it. Three steps. Most of your competitors haven't done any of them.

You've got a head start. Use it.

— The Groundwork Team

Need help? Reply to this email. A real person reads every one.

Go to My Dashboard → ${dashboardUrl}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>You just upgraded — and your professional website is live.</p>
<p>That's a big deal. Most contractors in your area still don't have one. Now you do.</p>
<p>Here are 3 quick things to do in the next 24 hours to make sure it's working for you:</p>
<p><strong>1. Add your logo (or business name graphic)</strong><br>
Your logo is the first thing customers see. Even a clean text-based logo looks 10x more professional than a blank header.<br>
<a href="${dashboardUrl}">→ Go to Site Customizer</a></p>
<p><strong>2. Pick your brand colors</strong><br>
Match your truck, your uniform, or just pick something you like. It takes 30 seconds and makes your site feel like yours.<br>
<a href="${dashboardUrl}">→ Open Color Settings</a></p>
<p><strong>3. Copy your website link and share it</strong><br>
Send it to a few contacts. Post it on your Facebook. Add it to your email signature. The sooner it's out there, the sooner it starts working.<br>
<a href="${dashboardUrl}">→ Copy My Website Link</a></p>
<p>That's it. Three steps. Most of your competitors haven't done any of them.</p>
<p>You've got a head start. Use it.</p>
<p>— The Groundwork Team</p>
<p><em>Need help? Reply to this email. A real person reads every one.</em></p>
<p><a href="${dashboardUrl}"><strong>Go to My Dashboard →</strong></a></p>`, appUrl),
      };
    }

    case "onboarding_paid_day3": {
      const dashboardUrl = data.dashboardUrl ?? `${appUrl}/dashboard`;
      return {
        subject: `${firstName}, Google doesn't know about you yet. Let's fix that.`,
        text: `Hey ${firstName},

Here's something most people don't realize: having a website doesn't automatically mean Google shows you to local customers.

To show up when someone nearby searches "plumber near me" or "electrician in [your city]" — you need a Google Business Profile.

It's free. It takes about 5 minutes to set up. And it's one of the highest-impact things you can do for your business.

Here's how to claim yours:

1. Go to business.google.com
2. Search for your business name
3. If it exists, claim it. If not, create it.
4. Add your phone number, hours, and a few photos
5. Verify your listing (Google will mail you a postcard or offer a phone call)

Once you're verified, your business shows up on Google Maps and in local search results. Customers can call you directly, get directions, and see your reviews.

The Groundwork side:

We've already submitted your sitemap to Google so your website gets indexed faster. Once your Google Business Profile is live, link your Groundwork site URL in the "Website" field — that's how Google connects the dots.

→ Claim Your Google Business Profile → https://business.google.com

This one step can drive more calls than almost anything else you do online.

— The Groundwork Team

Questions? Reply here — we're happy to walk you through it.

Set Up Google Business Profile → https://business.google.com`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>Here's something most people don't realize: having a website doesn't automatically mean Google shows you to local customers.</p>
<p>To show up when someone nearby searches "plumber near me" or "electrician in [your city]" — you need a Google Business Profile.</p>
<p>It's free. It takes about 5 minutes to set up. And it's one of the highest-impact things you can do for your business.</p>
<p><strong>Here's how to claim yours:</strong></p>
<ol>
<li>Go to <a href="https://business.google.com">business.google.com</a></li>
<li>Search for your business name</li>
<li>If it exists, claim it. If not, create it.</li>
<li>Add your phone number, hours, and a few photos</li>
<li>Verify your listing (Google will mail you a postcard or offer a phone call)</li>
</ol>
<p>Once you're verified, your business shows up on Google Maps and in local search results. Customers can call you directly, get directions, and see your reviews.</p>
<p><strong>The Groundwork side:</strong></p>
<p>We've already submitted your sitemap to Google so your website gets indexed faster. Once your Google Business Profile is live, link your Groundwork site URL in the "Website" field — that's how Google connects the dots.</p>
<p><a href="https://business.google.com"><strong>→ Claim Your Google Business Profile →</strong></a></p>
<p>This one step can drive more calls than almost anything else you do online.</p>
<p>— The Groundwork Team</p>
<p><em>Questions? Reply here — we're happy to walk you through it.</em></p>
<p><a href="https://business.google.com"><strong>Set Up Google Business Profile →</strong></a></p>`, appUrl),
      };
    }

    case "onboarding_paid_day7": {
      const dashboardUrl = data.dashboardUrl ?? `${appUrl}/dashboard`;
      const referralLink = data.referralLink ?? `${appUrl}/referral`;
      return {
        subject: `${firstName}, your first lead is closer than you think`,
        text: `Hey ${firstName},

It's been a week. Let's make sure your site is actually working for you.

Where do your leads go?

When someone fills out the contact form on your Groundwork site, it goes two places:

1. Email — directly to the inbox you set up
2. Your dashboard — where you can see every lead, when it came in, and what they asked for

→ Check My Leads → ${dashboardUrl}

If you're not getting leads yet, that's okay — your site is still young. The Google Business Profile from the last email is one of the fastest ways to change that.

---

Get your first review (the easy way)

Reviews are the #1 thing local customers look at before calling a contractor. Here's the fastest way to get them:

Think of 3 customers you've done good work for — even going back a year. Text or call them:

"Hey, I just launched my new business website and I'm trying to build my online reviews. Would you mind leaving me a quick Google review? It would really help. Here's the link: [your Google review link]"

Most people say yes. Three reviews puts you ahead of most contractors in your area.

---

Know another contractor?

If you know another plumber, electrician, landscaper, or tradesperson who's still running their business without a real website — send them your referral link.

When they sign up and upgrade, you get 1 month free. No limit on how many times you can use it.

→ Get My Referral Link → ${referralLink}

You're building something real here. We're glad you're on board.

— The Groundwork Team

Something not working right? Reply to this email and we'll fix it.

Go to My Dashboard → ${dashboardUrl}`,
        html: wrapInBrandedLayout(`<p>Hey ${firstName},</p>
<p>It's been a week. Let's make sure your site is actually working for you.</p>
<p><strong>Where do your leads go?</strong></p>
<p>When someone fills out the contact form on your Groundwork site, it goes two places:</p>
<ol>
<li><strong>Email</strong> — directly to the inbox you set up</li>
<li><strong>Your dashboard</strong> — where you can see every lead, when it came in, and what they asked for</li>
</ol>
<p><a href="${dashboardUrl}"><strong>→ Check My Leads →</strong></a></p>
<p>If you're not getting leads yet, that's okay — your site is still young. The Google Business Profile from the last email is one of the fastest ways to change that.</p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
<p><strong>Get your first review (the easy way)</strong></p>
<p>Reviews are the #1 thing local customers look at before calling a contractor. Here's the fastest way to get them:</p>
<p>Think of 3 customers you've done good work for — even going back a year. Text or call them:</p>
<blockquote style="border-left:3px solid #d1d5db;margin:16px 0;padding:8px 16px;color:#374151;">"Hey, I just launched my new business website and I'm trying to build my online reviews. Would you mind leaving me a quick Google review? It would really help. Here's the link: [your Google review link]"</blockquote>
<p>Most people say yes. Three reviews puts you ahead of most contractors in your area.</p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
<p><strong>Know another contractor?</strong></p>
<p>If you know another plumber, electrician, landscaper, or tradesperson who's still running their business without a real website — send them your referral link.</p>
<p>When they sign up and upgrade, <strong>you get 1 month free</strong>. No limit on how many times you can use it.</p>
<p><a href="${referralLink}"><strong>→ Get My Referral Link →</strong></a></p>
<p>You're building something real here. We're glad you're on board.</p>
<p>— The Groundwork Team</p>
<p><em>Something not working right? Reply to this email and we'll fix it.</em></p>
<p><a href="${dashboardUrl}"><strong>Go to My Dashboard →</strong></a></p>`, appUrl),
      };
    }

    default: {
      const _exhaustive: never = template;
      throw new Error(`Unknown email template: ${_exhaustive}`);
    }
  }
}
