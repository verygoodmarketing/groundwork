import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import {
  getOrCreateReferralCode,
  getReferralStats,
} from "@/lib/referral/utils";

export const referralRouter = router({
  /**
   * Get (or create) the referral code for the current user's business.
   * Used in the dashboard referral card.
   */
  getMyCode: protectedProcedure.query(async ({ ctx }) => {
    const owner = await ctx.db.businessOwner.findUnique({
      where: { userId: ctx.user.id },
      select: { businessId: true },
    });

    if (!owner) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No business found" });
    }

    const code = await getOrCreateReferralCode(owner.businessId);
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";
    const url = `${baseUrl}/ref/${code}`;

    return { code, url };
  }),

  /**
   * Get referral stats for the current user's business.
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const owner = await ctx.db.businessOwner.findUnique({
      where: { userId: ctx.user.id },
      select: { businessId: true, business: { select: { createdAt: true } } },
    });

    if (!owner) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No business found" });
    }

    const stats = await getReferralStats(owner.businessId);

    // Compute days since account creation for the dashboard "show after 7 days" gate
    const daysSinceCreated = Math.floor(
      (Date.now() - owner.business.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return { ...stats, daysSinceCreated };
  }),

  /**
   * Look up a referral code (public — used on /ref/[code] page).
   */
  lookupCode: publicProcedure
    .input(z.object({ code: z.string().min(6).max(12) }))
    .query(async ({ ctx, input }) => {
      const record = await ctx.db.referralCode.findUnique({
        where: { code: input.code },
        include: { business: { select: { name: true } } },
      });

      if (!record) return { valid: false, referrerName: null };
      return { valid: true, referrerName: record.business.name };
    }),
});
