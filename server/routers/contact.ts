import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { sendRawEmail } from "@/lib/email/send";

/** Escape HTML special characters to prevent injection in email content. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const contactRouter = router({
  /**
   * Submit a contact form (public — from a business's website)
   */
  submit: publicProcedure
    .input(
      z.object({
        businessSlug: z.string(),
        name: z.string().min(1).max(255),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.db.business.findUnique({
        where: { slug: input.businessSlug, isActive: true },
      });
      if (!business) throw new TRPCError({ code: "NOT_FOUND" });

      // Upsert contact
      const contact = await ctx.db.contact.upsert({
        where: {
          businessId_email: {
            businessId: business.id,
            email: input.email,
          },
        },
        update: {
          name: input.name,
          phone: input.phone,
          message: input.message,
        },
        create: {
          businessId: business.id,
          email: input.email,
          name: input.name,
          phone: input.phone,
          message: input.message,
          source: "contact_form",
        },
      });

      // Send lead notification email to business owner (fire-and-forget)
      try {
        const submittedAt = new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });

        const textBody = [
          `New lead from your website contact form.`,
          ``,
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          input.phone ? `Phone: ${input.phone}` : null,
          `Message: ${input.message}`,
          ``,
          `Submitted: ${submittedAt}`,
        ]
          .filter(Boolean)
          .join("\n");

        const safeName = escapeHtml(input.name);
        const safeEmail = escapeHtml(input.email);
        const safePhone = input.phone ? escapeHtml(input.phone) : null;
        const safeMessage = escapeHtml(input.message);
        const safeBizName = escapeHtml(business.name);

        const htmlBody = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#111;margin-bottom:16px;">New Lead from ${safeBizName}</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Name</td><td style="padding:8px 12px;">${safeName}</td></tr>
    <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Email</td><td style="padding:8px 12px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
    ${safePhone ? `<tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Phone</td><td style="padding:8px 12px;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ""}
    <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Message</td><td style="padding:8px 12px;">${safeMessage}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">Submitted</td><td style="padding:8px 12px;">${submittedAt}</td></tr>
  </table>
  <p style="margin-top:24px;color:#888;font-size:13px;">This lead was submitted through your Groundwork website contact form.</p>
</div>`;

        await sendRawEmail({
          to: business.email,
          subject: `New lead from ${business.name}`,
          text: textBody,
          html: htmlBody,
        });

        console.log(
          `[contact.submit] Lead notification sent to ${business.email} for business "${business.name}"`
        );
      } catch (err) {
        console.error(
          `[contact.submit] Failed to send lead notification for business "${business.name}":`,
          err
        );
      }

      return { success: true, contactId: contact.id };
    }),

  /**
   * List contacts for current business (dashboard)
   */
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const owner = await ctx.db.businessOwner.findUnique({
        where: { userId: ctx.user.id },
      });
      if (!owner) throw new TRPCError({ code: "NOT_FOUND" });

      const contacts = await ctx.db.contact.findMany({
        where: { businessId: owner.businessId },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (contacts.length > input.limit) {
        const nextItem = contacts.pop();
        nextCursor = nextItem?.id;
      }

      return { contacts, nextCursor };
    }),
});
