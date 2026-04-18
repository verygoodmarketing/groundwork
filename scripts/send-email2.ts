/**
 * Send Email 2 to all waitlist subscribers.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx DATABASE_URL=postgresql://... npx tsx scripts/send-email2.ts
 *
 * Set DRY_RUN=true to print recipients without sending.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Resend } from "resend";

const DRY_RUN = process.env.DRY_RUN === "true";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "GroundWork <brad@send.groundworklocal.com>";
const SUBJECT =
  "The scheduling problem that's costing service businesses jobs (and how to fix it)";
const PREVIEW_TEXT =
  "Most service businesses lose leads before they even know the lead existed.";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildHtml(email: string): string {
  // No first name in waitlist — use generic greeting
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#f9f9f9;font-family:Georgia,serif;">
  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${PREVIEW_TEXT}&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9f9f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:6px;padding:40px 48px;max-width:600px;">
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #f0f0f0;margin-bottom:32px;">
              <img src="https://groundworklocal.com/brand/logo-horizontal-light.png" alt="GroundWork" width="160" style="display:block;" />
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:26px;color:#333333;">Hey there,</p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                Here's a problem that kills revenue for local service businesses — and most owners never notice it's happening:
              </p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                A potential customer searches for your service at 9 PM.
              </p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                They find you. They visit your website. They want to book.
              </p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                But there's no way to request a service online. No form. No booking option. Just a phone number that goes to voicemail.
              </p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                So they hit the back button and call the next result.
              </p>

              <p style="margin:0 0 24px 0;font-size:16px;line-height:26px;color:#333333;">
                You never knew they existed.
              </p>

              <p style="margin:0 0 24px 0;font-size:18px;line-height:28px;color:#111111;font-weight:bold;">
                This is the scheduling problem GroundWork solves.
              </p>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                Most "scheduling software" focuses on managing the calendar <em>after</em> the phone rings. GroundWork makes sure the phone rings in the first place — with a professional website that:
              </p>

              <ul style="margin:0 0 24px 0;padding-left:24px;">
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Shows up in local search when people are actively looking for your service</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Has a lead capture form and click-to-call on every page</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Works 24/7 — not just during business hours</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Sends new inquiries straight to your phone or inbox, instantly</li>
              </ul>

              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
                The result: you capture the leads you're currently losing to competitors who have a faster web presence.
              </p>

              <p style="margin:0 0 8px 0;font-size:16px;line-height:26px;color:#333333;font-weight:bold;">The math:</p>

              <p style="margin:0 0 24px 0;font-size:16px;line-height:26px;color:#333333;">
                If you capture just 2 additional service calls per month from online search — jobs you're currently missing — at $200–$400 per job, that's $400–$800/month in recovered revenue. GroundWork starts at $49/month.
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                <tr>
                  <td style="background-color:#1a1a2e;border-radius:4px;padding:14px 28px;">
                    <a href="https://groundworklocal.com" style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;display:block;">
                      See how GroundWork works for your trade →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px 0;font-size:16px;line-height:26px;color:#333333;">Still on the free trial fence? Here's what's included:</p>
              <ul style="margin:0 0 24px 0;padding-left:24px;">
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">14 days free</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">No credit card required</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Full access to all features</li>
                <li style="margin-bottom:8px;font-size:16px;line-height:26px;color:#333333;">Cancel anytime if it's not working</li>
              </ul>

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
                <tr>
                  <td style="background-color:#1a1a2e;border-radius:4px;padding:14px 28px;">
                    <a href="https://groundworklocal.com" style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;display:block;">
                      Start your free trial →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px 0;font-size:16px;line-height:26px;color:#333333;">Brad</p>
              <p style="margin:0 0 32px 0;font-size:14px;line-height:22px;color:#888888;">GroundWork</p>

              <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px 0;">
              <p style="margin:0;font-size:12px;line-height:20px;color:#aaaaaa;text-align:center;">
                You're receiving this because you signed up for early access to GroundWork.<br>
                <a href="https://groundworklocal.com" style="color:#aaaaaa;">groundworklocal.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(): string {
  return `Hey there,

Here's a problem that kills revenue for local service businesses — and most owners never notice it's happening:

A potential customer searches for your service at 9 PM.

They find you. They visit your website. They want to book.

But there's no way to request a service online. No form. No booking option. Just a phone number that goes to voicemail.

So they hit the back button and call the next result.

You never knew they existed.

THIS IS THE SCHEDULING PROBLEM GROUNDWORK SOLVES.

Most "scheduling software" focuses on managing the calendar after the phone rings. GroundWork makes sure the phone rings in the first place — with a professional website that:

- Shows up in local search when people are actively looking for your service
- Has a lead capture form and click-to-call on every page
- Works 24/7 — not just during business hours
- Sends new inquiries straight to your phone or inbox, instantly

The result: you capture the leads you're currently losing to competitors who have a faster web presence.

THE MATH:

If you capture just 2 additional service calls per month from online search — jobs you're currently missing — at $200–$400 per job, that's $400–$800/month in recovered revenue. GroundWork starts at $49/month.

See how GroundWork works for your trade: https://groundworklocal.com

Still on the free trial fence? Here's what's included:
- 14 days free
- No credit card required
- Full access to all features
- Cancel anytime if it's not working

Start your free trial: https://groundworklocal.com

Brad
GroundWork

---
You're receiving this because you signed up for early access to GroundWork.
groundworklocal.com
`;
}

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  });
  const prisma = new PrismaClient({ adapter });
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const signups = await prisma.waitlistSignup.findMany({
      select: { email: true },
    });

    console.log(`Found ${signups.length} waitlist subscribers.`);

    // Filter out obvious test/QA addresses that don't represent real customers
    const TEST_DOMAINS = [
      "example.com",
      "mailinator.com",
      
      
    ];
    const realSignups = signups.filter(({ email }) => {
      const domain = email.split("@")[1]?.toLowerCase() ?? "";
      return !TEST_DOMAINS.includes(domain);
    });

    console.log(
      `${signups.length} total subscribers, ${realSignups.length} real (${signups.length - realSignups.length} test addresses skipped).`
    );

    if (realSignups.length === 0) {
      console.log("No real subscribers to email. Exiting.");
      return;
    }

    if (DRY_RUN) {
      console.log("DRY RUN — would send to:");
      for (const s of realSignups) {
        console.log(" -", s.email);
      }
      return;
    }

    let sent = 0;
    let failed = 0;

    for (const { email } of realSignups) {
      try {
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          replyTo: "brad@groundworklocal.com",
          subject: SUBJECT,
          html: buildHtml(email),
          text: buildText(),
        });

        if (result.error) {
          console.error(`FAILED ${email}:`, result.error);
          failed++;
        } else {
          console.log(`SENT to ${email} — id: ${result.data?.id}`);
          sent++;
        }

        // Small delay to avoid rate limits
        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        console.error(`ERROR sending to ${email}:`, err);
        failed++;
      }
    }

    console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
