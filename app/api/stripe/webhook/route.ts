import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { prisma } from "@/lib/db/client";
import type { BillingStatus, PlanTier } from "@prisma/client";

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

  await prisma.business.update({
    where: { id: businessId },
    data: {
      stripeSubscriptionId: subscriptionId,
      stripeCustomerId: stripeCustomerId ?? undefined,
      stripePlanId: planKey ?? null,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      planTier: planKey ?? null,
      subscriptionStatus: subscription.status === "trialing" ? "TRIAL" : "ACTIVE",
    },
  });
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

  await prisma.business.update({
    where: { id: business.id },
    data: {
      subscriptionStatus: "ACTIVE",
      stripeCurrentPeriodEnd: currentPeriodEnd,
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const business = await prisma.business.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    console.warn(`subscription.updated: no business for subscription ${subscription.id}`);
    return;
  }

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
