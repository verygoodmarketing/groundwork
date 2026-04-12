import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { stripe, PLANS } from "@/lib/stripe/client";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://versa-kohl.vercel.app";

export const stripeRouter = router({
  /**
   * Create a Stripe Checkout Session for a subscription plan.
   * Redirects the user to Stripe to complete payment.
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        planKey: z.enum(["STARTER", "PRO", "BUSINESS"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
        include: { business: true },
      });

      if (!owner) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No business found for this user",
        });
      }

      const plan = PLANS[input.planKey];

      if (!plan.priceId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Stripe Price ID for ${input.planKey} is not configured. Contact support.`,
        });
      }

      const { business } = owner;

      // Reuse existing Stripe customer if available
      let stripeCustomerId = business.stripeCustomerId ?? undefined;

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: business.email,
          name: business.name,
          metadata: {
            businessId: business.id,
            userId: ctx.user.id,
          },
        });
        stripeCustomerId = customer.id;

        await ctx.db.business.update({
          where: { id: business.id },
          data: { stripeCustomerId },
        });
      }

      // If they already have an active subscription, redirect to portal instead
      if (business.stripeSubscriptionId) {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: stripeCustomerId,
          return_url: `${APP_URL}/dashboard`,
        });
        return { url: portalSession.url };
      }

      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: plan.priceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 14,
          metadata: {
            businessId: business.id,
            planKey: input.planKey,
          },
        },
        success_url: `${APP_URL}/dashboard?checkout=success&plan=${input.planKey.toLowerCase()}`,
        cancel_url: `${APP_URL}/pricing?checkout=cancelled`,
        metadata: {
          businessId: business.id,
          planKey: input.planKey,
        },
      });

      if (!session.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create Stripe checkout session",
        });
      }

      return { url: session.url };
    }),

  /**
   * Create a Stripe Billing Portal session for managing subscriptions.
   */
  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const owner = await ctx.db.businessOwner.findUnique({
      where: { userId: ctx.user.id },
      include: { business: true },
    });

    if (!owner) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    if (!owner.business.stripeCustomerId) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "No billing account found. Please subscribe to a plan first.",
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: owner.business.stripeCustomerId,
      return_url: `${APP_URL}/dashboard`,
    });

    return { url: session.url };
  }),

  /**
   * Get the current subscription status for the authenticated user's business.
   */
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const owner = await ctx.db.businessOwner.findUnique({
      where: { userId: ctx.user.id },
      include: { business: true },
    });

    if (!owner) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const { business } = owner;

    return {
      planTier: business.planTier,
      subscriptionStatus: business.subscriptionStatus,
      stripeCurrentPeriodEnd: business.stripeCurrentPeriodEnd,
      isActive:
        business.subscriptionStatus === "ACTIVE" ||
        business.subscriptionStatus === "TRIAL",
    };
  }),
});
