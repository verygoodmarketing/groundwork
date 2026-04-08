import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

export const businessRouter = router({
  /**
   * Get the current user's business (dashboard use)
   */
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
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

    return owner.business;
  }),

  /**
   * Create a new business account (onboarding)
   */
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        slug: z
          .string()
          .min(2)
          .max(63)
          .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
        // email is optional here — falls back to the authenticated user's email
        email: z.string().email().optional(),
        phone: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check slug uniqueness
      const existing = await ctx.db.business.findUnique({
        where: { slug: input.slug },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That URL is already taken. Please choose a different one.",
        });
      }

      const business = await ctx.db.business.create({
        data: {
          ...input,
          // Fall back to auth email if not explicitly provided
          email: input.email ?? ctx.user.email ?? "",
          owners: {
            create: {
              userId: ctx.user.id,
              role: "OWNER",
            },
          },
        },
      });

      return business;
    }),

  /**
   * Update business profile
   */
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        logoUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
      });
      if (!owner) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.business.update({
        where: { id: owner.businessId },
        data: input,
      });
    }),

  /**
   * Get a business by slug (public site rendering)
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const business = await ctx.db.business.findUnique({
        where: { slug: input.slug, isActive: true },
        include: { site: { include: { pages: true } } },
      });

      if (!business) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return business;
    }),

  /**
   * Check if a slug is available (public — used for live preview in onboarding step 2)
   */
  checkSlug: publicProcedure
    .input(z.object({ slug: z.string().min(2).max(63) }))
    .query(async ({ ctx, input }) => {
      const existing = await ctx.db.business.findUnique({
        where: { slug: input.slug },
        select: { id: true },
      });
      return { available: !existing };
    }),

  /**
   * Update the current user's onboarding step and data (protected — steps 2–5)
   */
  updateOnboardingStep: protectedProcedure
    .input(
      z.object({
        step: z.number().int().min(1).max(5),
        // Step 2 — business profile
        name: z.string().min(1).max(255).optional(),
        slug: z
          .string()
          .min(2)
          .max(63)
          .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes")
          .optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        category: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        serviceAreaRadius: z.number().int().positive().optional(),
        // Step 3 — template selection
        templateId: z.string().optional(),
        themeColor: z.string().optional(),
        themeFont: z.string().optional(),
        // Step 4 — contact form config
        contactFormFields: z.array(z.string()).optional(),
        contactFormNotifyEmail: z.string().email().optional(),
        // Step 5 — go live
        customDomain: z.string().optional(),
        publish: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
        include: { business: { include: { site: true } } },
      });

      if (!owner) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No business found for this user" });
      }

      const { step, templateId, themeColor, themeFont, contactFormFields, contactFormNotifyEmail, publish, ...businessFields } = input;

      // Check slug uniqueness if slug is being updated
      if (businessFields.slug && businessFields.slug !== owner.business.slug) {
        const existing = await ctx.db.business.findUnique({
          where: { slug: businessFields.slug },
          select: { id: true },
        });
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "That URL is already taken. Please choose a different one.",
          });
        }
      }

      // Mark complete if reaching step 5 and publishing
      const isComplete = step === 5 && publish === true;

      // Update business fields
      const updatedBusiness = await ctx.db.business.update({
        where: { id: owner.businessId },
        data: {
          ...businessFields,
          onboardingStep: isComplete ? 5 : Math.max(step, owner.business.onboardingStep),
          onboardingComplete: isComplete ? true : owner.business.onboardingComplete,
        },
      });

      // Handle site updates (steps 3 & 4 & 5)
      if (templateId || themeColor || themeFont || contactFormFields || contactFormNotifyEmail !== undefined || publish !== undefined) {
        const siteData: Record<string, unknown> = {};

        if (templateId) siteData.templateId = templateId;
        if (contactFormFields) siteData.contactFormFields = contactFormFields;
        if (contactFormNotifyEmail !== undefined) siteData.contactFormNotifyEmail = contactFormNotifyEmail;

        if (themeColor || themeFont) {
          const existing = owner.business.site?.config ?? {};
          siteData.config = {
            ...(typeof existing === "object" && existing !== null ? existing : {}),
            ...(themeColor ? { primaryColor: themeColor } : {}),
            ...(themeFont ? { fontFamily: themeFont } : {}),
          };
        }

        if (publish === true) {
          siteData.isPublished = true;
          siteData.publishedAt = new Date();
        }

        if (owner.business.site) {
          await ctx.db.site.update({
            where: { businessId: owner.businessId },
            data: siteData,
          });
        } else if (templateId) {
          // Create site record on first template selection
          await ctx.db.site.create({
            data: {
              businessId: owner.businessId,
              templateId,
              config: siteData.config ?? {},
              ...(contactFormFields ? { contactFormFields } : {}),
              ...(contactFormNotifyEmail !== undefined ? { contactFormNotifyEmail } : {}),
            },
          });
        }
      }

      return updatedBusiness;
    }),
});
