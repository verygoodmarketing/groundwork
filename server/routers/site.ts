import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import type { Prisma } from "@prisma/client";

export const siteRouter = router({
  /**
   * Get site config for the current business
   */
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const owner = await ctx.db.businessOwner.findUnique({
      where: { userId: ctx.user.id },
    });
    if (!owner) throw new TRPCError({ code: "NOT_FOUND" });

    const site = await ctx.db.site.findUnique({
      where: { businessId: owner.businessId },
      include: { pages: true },
    });

    return site;
  }),

  /**
   * Initialize site for business (called during onboarding)
   */
  initialize: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
        config: z.record(z.string(), z.unknown()).optional(),
        blocks: z.array(z.record(z.string(), z.unknown())).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
      });
      if (!owner) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.db.site.create({
        data: {
          businessId: owner.businessId,
          templateId: input.templateId,
          config: (input.config ?? {}) as Prisma.InputJsonValue,
          blocks: (input.blocks ?? []) as Prisma.InputJsonValue,
        },
      });
    }),

  /**
   * Save site content (blocks + config)
   */
  save: protectedProcedure
    .input(
      z.object({
        blocks: z.array(z.record(z.string(), z.unknown())).optional(),
        config: z.record(z.string(), z.unknown()).optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
      });
      if (!owner) throw new TRPCError({ code: "NOT_FOUND" });

      const site = await ctx.db.site.findUnique({
        where: { businessId: owner.businessId },
      });
      if (!site) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.db.site.update({
        where: { id: site.id },
        data: {
          ...(input.blocks !== undefined && {
            blocks: input.blocks as Prisma.InputJsonValue,
          }),
          ...(input.config !== undefined && {
            config: input.config as Prisma.InputJsonValue,
          }),
          metaTitle: input.metaTitle,
          metaDescription: input.metaDescription,
        },
      });
    }),

  /**
   * Publish or unpublish the site
   */
  setPublished: protectedProcedure
    .input(z.object({ published: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
      });
      if (!owner) throw new TRPCError({ code: "NOT_FOUND" });

      const site = await ctx.db.site.findUnique({
        where: { businessId: owner.businessId },
      });
      if (!site) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.db.site.update({
        where: { id: site.id },
        data: {
          isPublished: input.published,
          publishedAt: input.published ? new Date() : undefined,
        },
      });
    }),
});
