/**
 * Send Touch 2 cold outreach emails to the same 5 local service business targets
 * from Touch 1 (send 3 days after Touch 1 — target date: Apr 18, 2026).
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx DRY_RUN=true npx tsx scripts/send-cold-touch2.ts
 *
 * Production (pull env first):
 *   vercel env pull .env.production
 *   env $(cat .env.production | grep -v '^#' | xargs) npx tsx scripts/send-cold-touch2.ts
 */

import { Resend } from "resend";

const DRY_RUN = process.env.DRY_RUN === "true";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Brad at GroundWork <brad@send.groundworklocal.com>";
const CALENDAR_LINK = "https://groundworklocal.com";

interface Target {
  firstName: string;
  businessName: string;
  trade: string;
  city: string;
  state: string;
  email: string;
}

// Same 5 targets as Touch 1 (send-cold-touch1.ts)
const TARGETS: Target[] = [
  {
    firstName: "Brian",
    businessName: "1st Generation Electric",
    trade: "electrician",
    city: "Atlanta",
    state: "GA",
    email: "bfoster@fisrtgenelectric.com",
  },
  {
    firstName: "Owner",
    businessName: "Bay Area Contracting and Construction",
    trade: "contractor",
    city: "Tampa",
    state: "FL",
    email: "tampabayareacc@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Mr Wise Electric",
    trade: "electrician",
    city: "Atlanta",
    state: "GA",
    email: "info@mrwiseelectric.com",
  },
  {
    firstName: "Paul",
    businessName: "Confident Electric",
    trade: "electrician",
    city: "Columbus",
    state: "OH",
    email: "confidentelectric@yahoo.com",
  },
  {
    firstName: "Jacob",
    businessName: "J.C. Lawncare",
    trade: "landscaper",
    city: "Denver",
    state: "CO",
    email: "jclawncaredenver@gmail.com",
  },
];

function buildSubject(t: Target): string {
  // Touch 2 best subject: "What happened after a [TRADE] in [CITY] went live"
  return `What happened after a ${t.trade} in ${t.city} went live`;
}

function buildHtml(t: Target): string {
  const greeting =
    t.firstName === "Owner" ? "Hi there" : `Hi ${t.firstName}`;
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 0;">
    <tr>
      <td align="left" style="max-width:560px;padding:0 24px;">
        <p style="margin:0 0 24px 0;">
          <img src="https://groundworklocal.com/brand/logo-horizontal-light.png" alt="GroundWork" width="160" style="display:block;" />
        </p>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">${greeting},</p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Following up — but wanted to share something relevant instead of just bumping my last email.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          We recently helped a ${t.trade} in a market similar to ${t.city}. They had zero web presence. Set up GroundWork on a Saturday. By the following Friday, they had 2 quote requests come in from Google search.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Nothing fancy. Just a clean site, a contact form, and local SEO that works.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          If you've been meaning to get online but haven't found the time, that's the whole point of GroundWork — it takes about an hour.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Still worth a quick 15 minutes? <a href="${CALENDAR_LINK}" style="color:#1a1a2e;">${CALENDAR_LINK}</a>
        </p>

        <p style="margin:0 0 4px 0;font-size:16px;line-height:26px;color:#333333;">Brad</p>
        <p style="margin:0 0 24px 0;font-size:14px;line-height:22px;color:#888888;">
          GroundWork<br>
          <a href="https://groundworklocal.com" style="color:#888888;">groundworklocal.com</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(t: Target): string {
  const greeting =
    t.firstName === "Owner" ? "Hi there" : `Hi ${t.firstName}`;
  return `${greeting},

Following up — but wanted to share something relevant instead of just bumping my last email.

We recently helped a ${t.trade} in a market similar to ${t.city}. They had zero web presence. Set up GroundWork on a Saturday. By the following Friday, they had 2 quote requests come in from Google search.

Nothing fancy. Just a clean site, a contact form, and local SEO that works.

If you've been meaning to get online but haven't found the time, that's the whole point of GroundWork — it takes about an hour.

Still worth a quick 15 minutes? ${CALENDAR_LINK}

Brad
GroundWork
https://groundworklocal.com
`;
}

async function main() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(`Touch 2 cold outreach — ${TARGETS.length} targets`);

  if (DRY_RUN) {
    console.log("\nDRY RUN — would send to:");
    for (const t of TARGETS) {
      console.log(`  - ${t.email} (${t.businessName}, ${t.city} ${t.state})`);
      console.log(`    Subject: "${buildSubject(t)}"`);
    }
    return;
  }

  const results: { email: string; businessName: string; status: string; id?: string }[] = [];

  for (const t of TARGETS) {
    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [t.email],
        subject: buildSubject(t),
        html: buildHtml(t),
        text: buildText(t),
      });

      if (error) {
        console.error(`FAIL ${t.email}: ${JSON.stringify(error)}`);
        results.push({ email: t.email, businessName: t.businessName, status: "failed" });
      } else {
        console.log(`SENT ${t.email} → Resend ID: ${data?.id}`);
        results.push({ email: t.email, businessName: t.businessName, status: "sent", id: data?.id });
      }
    } catch (err) {
      console.error(`ERROR ${t.email}:`, err);
      results.push({ email: t.email, businessName: t.businessName, status: "error" });
    }
  }

  console.log("\n--- Results ---");
  const sent = results.filter((r) => r.status === "sent");
  const failed = results.filter((r) => r.status !== "sent");
  console.log(`Sent: ${sent.length} / ${results.length}`);
  if (failed.length > 0) {
    console.log("Failed:", failed.map((r) => r.email).join(", "));
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
