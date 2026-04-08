import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc";

export const waitlistRouter = router({
  /**
   * Join the waitlist — public, no auth required.
   * Upserts on email (duplicate emails are handled gracefully).
   */
  join: publicProcedure
    .input(
      z.object({
        email: z.string().email({ message: "Please enter a valid email address." }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.waitlistSignup.upsert({
        where: { email: input.email },
        update: {}, // no-op: already on waitlist, just succeed silently
        create: { email: input.email },
      });

      return { success: true };
    }),
});
