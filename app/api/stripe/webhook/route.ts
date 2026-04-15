import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { prisma } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";
import { getOrCreateReferralCode } from "@/lib/referral/utils";
import type { BillingStatus, PlanTier } from "@prisma/client";
import { track } from "@vercel/analytics/server";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events:
 *   - checkout.session.completed  → provision subscription after checkout
 *   - invoice.paid                → renew subscription, keep status ACTIVE
 *   - customer.subscription.updated → sync plan/status changes
 *   - customer.subscription.deleted → mark subscription as CANCELLED
 *   - invoice.payment_failed      → mark subscription as PAST_DUE
 *
 * NOTE: Stripe v22 moved `Invoice.subscription` under
 * `invoice.parent.subscription_details.subscription`, and
 * `Subscription.current_period_end` is now on each `SubscriptionItem`
 * (`subscription.items.data[0].current_period_end`).
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`Error handling webhook event ${event.type}:`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/**
 * Extract the subscription ID from a Stripe Invoice in v22.
 * In Stripe v22 the subscription reference moved to
 * `invoice.parent.subscription_details.subscription`.
 */
function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const parent = invoice.parent;
  if (!parent || parent.type !== "subscription_details") return null;
  const sub = parent.subscription_details?.subscription;
  if (!sub) return null;
  return typeof sub === "string" ? sub : sub.id;
}

/**
 * Get the current period end from a Stripe Subscription in v22.
 * `current_period_end` moved from the Subscription root to each SubscriptionItem.
 */
function getCurrentPeriodEnd(subscription: Stripe.Subscription): Date {
  const item = subscription.items.data[0];
  // `current_period_end` exists on SubscriptionItem in v22
  const timestamp = (item as Stripe.SubscriptionItem & { current_period_end: number })
    .current_period_end;
  return new Date(timestamp * 1000);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const businessId = session.metadata?.businessId;
  const planKey = session.metadata?.planKey as PlanTier | undefined;

  if (!businessId) {
    console.error("checkout.session.completed: missing businessId in metadata");
    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : (session.subscription as Stripe.Subscription | null)?.id;

  if (!subscriptionId) {
    console.error("checkout.session.completed: missing subscription id");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const currentPeriodEnd = getCurrentPeriodEnd(subscription);

  const stripeCustomerId =
    typeof session.customer === "string"
      ? session.customer
      : (session.customer as Stripe.Customer | null)?.id;

  const isPaidTier = subscription.status !== "trialing";
  const now = new Date();

  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      stripeSubscriptionId: subscriptionId,
      stripeCustomerId: stripeCustomerId ?? undefined,
      stripePlanId: planKey ?? null,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      planTier: planKey ?? null,
      subscriptionStatus: subscription.status === "trialing" ? "TRIAL" : "ACTIVE",
      // Record the paid subscription start time for onboarding email scheduling
      ...(isPaidTier ? { paidSubscriptionStartedAt: now } : {}),
    },
  });

  // Fire analytics events — no PII, anonymous subscription metadata only.
  if (subscription.status === "trialing") {
    track("trial_started", { planTier: planKey ?? null }).catch(() => {});
  } else {
    track("subscription_activated", { planTier: planKey ?? null }).catch(() => {});
  }

  // Send post-conversion welcome email (only for non-trial checkouts)
  if (isPaidTier && business.email) {
    await sendEmail(business.email, "post_conversion_welcome", {
      firstName: business.name.split(" ")[0] ?? "there",
    }).catch((err) =>
      console.error("[stripe/webhook] post_conversion_welcome email failed:", err)
    );
  }

  // Fire post-paid onboarding Day 1 email (idempotent)
  if (isPaidTier && business.email) {
    await triggerPaidOnboardingDay1(business.id, business.email, business.name).catch((err) =>
      console.error("[stripe/webhook] paid onboarding day1 email failed:", err)
    );
  }
}

/**
 * Handle customer.subscription.created — primary trigger for paid onboarding Day 1 email.
 * Also records paidSubscriptionStartedAt if not already set.
 * Skips trialing subscriptions (free trial).
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Only process paid (non-trial) subscriptions
  if (subscription.status === "trialing") return;

  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    // Business may not exist yet if checkout hasn't completed — safe to skip.
    // handleCheckoutCompleted will handle the Day 1 email.
    return;
  }

  // Set paidSubscriptionStartedAt if not already recorded
  if (!business.paidSubscriptionStartedAt) {
    await prisma.business.update({
      where: { id: business.id },
      data: { paidSubscriptionStartedAt: new Date() },
    });
  }

  // Fire Day 1 onboarding email (idempotent — won't re-send if already sent)
  if (business.email) {
    await triggerPaidOnboardingDay1(business.id, business.email, business.name).catch((err) =>
      console.error("[stripe/webhook] subscription.created day1 email failed:", err)
    );
  }
}

/**
 * Send the post-paid onboarding Day 1 email to a business.
 * Idempotent: checks paidOnboardingDay1SentAt before sending.
 * Sets paidOnboardingDay1SentAt after a successful send.
 */
async function triggerPaidOnboardingDay1(
  businessId: string,
  email: string,
  name: string
): Promise<void> {
  // Re-fetch to get the latest sentAt state (avoids race on webhook replay)
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { id: true, paidOnboardingDay1SentAt: true, paidSubscriptionStartedAt: true },
  });

  if (!business) return;

  // Idempotency guard: skip if already sent
  if (business.paidOnboardingDay1SentAt) {
    console.log(`[paid-onboarding] Day 1 already sent for business ${businessId} — skipping`);
    return;
  }

  const firstName = name.split(" ")[0] ?? "there";
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.groundwork.so"}/dashboard`;

  await sendEmail(email, "onboarding_paid_day1", {
    firstName,
    dashboardUrl,
  });

  await prisma.business.update({
    where: { id: businessId },
    data: {
      paidOnboardingDay1SentAt: new Date(),
      // Ensure paidSubscriptionStartedAt is set (may have been missed if subscription.created fired first)
      paidSubscriptionStartedAt: business.paidSubscriptionStartedAt ?? new Date(),
    },
  });

  console.log(`[paid-onboarding] Day 1 sent to ${email} (business ${businessId})`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const currentPeriodEnd = getCurrentPeriodEnd(subscription);

  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!business) {
    console.warn(`invoice.paid: no business found for subscription ${subscriptionId}`);
    return;
  }

  const previousStatus = business.subscriptionStatus;

  await prisma.business.update({
    where: { id: business.id },
    data: {
      subscriptionStatus: "ACTIVE",
      stripeCurrentPeriodEnd: currentPeriodEnd,
    },
  });

  // Referral reward: trigger on the first paid invoice after conversion from trial
  // (status was TRIAL or PENDING, now transitioning to ACTIVE with a paid invoice).
  const wasOnTrial = previousStatus === "TRIAL" || previousStatus == null;
  if (wasOnTrial && business.stripeCustomerId) {
    await processReferralCredits(business.id, business.stripeCustomerId).catch((err) =>
      console.error("[stripe/webhook] referral credit processing failed:", err)
    );
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    console.warn(`subscription.updated: no business for subscription ${subscription.id}`);
    return;
  }

  const previousStatus = business.subscriptionStatus;
  const planKey = subscription.metadata?.planKey as PlanTier | undefined;
  const currentPeriodEnd = getCurrentPeriodEnd(subscription);

  let billingStatus: BillingStatus;
  switch (subscription.status) {
    case "active":
      billingStatus = "ACTIVE";
      break;
    case "trialing":
      billingStatus = "TRIAL";
      break;
    case "past_due":
      billingStatus = "PAST_DUE";
      break;
    case "canceled":
    case "unpaid":
    case "incomplete_expired":
      billingStatus = "CANCELLED";
      break;
    default:
      billingStatus = "ACTIVE";
  }

  await prisma.business.update({
    where: { id: business.id },
    data: {
      subscriptionStatus: billingStatus,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      ...(planKey ? { planTier: planKey } : {}),
    },
  });

  // Send trial-expired email when trial transitions to cancelled/expired (not converted)
  const wasOnTrial = previousStatus === "TRIAL" || previousStatus == null;
  const isNowCancelled = billingStatus === "CANCELLED";
  if (wasOnTrial && isNowCancelled && business.email) {
    await sendEmail(business.email, "trial_expired", {
      firstName: business.name.split(" ")[0] ?? "there",
    }).catch((err) =>
      console.error("[stripe/webhook] trial_expired email failed:", err)
    );
  }

  // Send post-conversion welcome when transitioning from trial → active
  const wasTrialing = previousStatus === "TRIAL" || previousStatus == null;
  const isNowActive = billingStatus === "ACTIVE";
  if (wasTrialing && isNowActive && business.email) {
    track("subscription_activated", { planTier: planKey ?? null }).catch(() => {});
    await sendEmail(business.email, "post_conversion_welcome", {
      firstName: business.name.split(" ")[0] ?? "there",
    }).catch((err) =>
      console.error("[stripe/webhook] post_conversion_welcome email failed:", err)
    );

    // Fire post-paid onboarding Day 1 email on trial → active conversion (idempotent)
    await triggerPaidOnboardingDay1(business.id, business.email, business.name).catch((err) =>
      console.error("[stripe/webhook] subscription.updated day1 email failed:", err)
    );
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    console.warn(`subscription.deleted: no business for subscription ${subscription.id}`);
    return;
  }

  await prisma.business.update({
    where: { id: business.id },
    data: {
      subscriptionStatus: "CANCELLED",
      stripeSubscriptionId: null,
      stripePlanId: null,
      planTier: null,
    },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) return;

  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!business) return;

  await prisma.business.update({
    where: { id: business.id },
    data: { subscriptionStatus: "PAST_DUE" },
  });
}

/**
 * Apply billing credits to both the referred user and the referrer when
 * the referred user completes their first paid billing cycle.
 *
 * Mechanic: Give 1 month free / Get 1 month free (bi-directional).
 * Credit amount: $49 (4900 cents) — one month of Starter plan.
 */
async function processReferralCredits(
  referredBusinessId: string,
  referredStripeCustomerId: string
) {
  // Find a pending referral for this business
  const referral = await prisma.referral.findFirst({
    where: {
      referredBusinessId,
      status: "PENDING",
    },
    include: {
      referrerBusiness: {
        select: { id: true, stripeCustomerId: true, name: true, email: true },
      },
      referredBusiness: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (!referral) return; // No referral to process

  // Credit amount: $49 (one month Starter)
  const CREDIT_AMOUNT = 4900; // cents
  const CREDIT_CURRENCY = "usd";

  // Apply credit to referred user
  await stripe.customers.createBalanceTransaction(referredStripeCustomerId, {
    amount: -CREDIT_AMOUNT, // negative = credit
    currency: CREDIT_CURRENCY,
    description: "Referral reward: 1 free month from joining via referral link",
  });

  // Apply credit to referrer (if they have a Stripe customer ID)
  if (referral.referrerBusiness.stripeCustomerId) {
    await stripe.customers.createBalanceTransaction(
      referral.referrerBusiness.stripeCustomerId,
      {
        amount: -CREDIT_AMOUNT,
        currency: CREDIT_CURRENCY,
        description: `Referral reward: 1 free month for referring ${referral.referredBusiness?.name ?? "a new customer"}`,
      }
    );
  }

  // Mark referral as rewarded
  await prisma.referral.update({
    where: { id: referral.id },
    data: {
      status: "REWARDED",
      convertedAt: new Date(),
      rewardedAt: new Date(),
    },
  });

  // Fire analytics event
  track("referral_rewarded", {
    referrerBusinessId: referral.referrerBusiness.id,
    referredBusinessId,
  }).catch(() => {});

  console.log(
    `[referral] Credits applied — referrer: ${referral.referrerBusiness.id}, referred: ${referredBusinessId}`
  );
}
