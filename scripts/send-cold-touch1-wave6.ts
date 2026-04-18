/**
 * Wave 6 — Send Touch 1 cold outreach emails to 20 local service business targets.
 * Cities: Fresno CA, Bakersfield CA, Baton Rouge LA, Shreveport LA, Spokane WA,
 *         Tacoma WA, Knoxville TN, Chattanooga TN, Savannah GA, Mobile AL
 *
 * Touch 2 follow-up: run send-cold-touch2-wave6.ts on Apr 19–20, 2026
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx DRY_RUN=true npx tsx scripts/send-cold-touch1-wave6.ts
 *
 * Production:
 *   RESEND_API_KEY=re_xxx npx tsx scripts/send-cold-touch1-wave6.ts
 */

import { Resend } from "resend";

const DRY_RUN = process.env.DRY_RUN === "true";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Brad at Groundwork <brad@send.groundworklocal.com>";
const CALENDAR_LINK = "https://groundworklocal.com";

interface Target {
  firstName: string;
  businessName: string;
  trade: string;
  city: string;
  state: string;
  email: string;
}

const TARGETS: Target[] = [
  // Fresno, CA
  {
    firstName: "Owner",
    businessName: "Central Valley Plumbing & Drain",
    trade: "plumber",
    city: "Fresno",
    state: "CA",
    email: "centralvalleyplumbingca@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "San Joaquin Lawn & Landscape",
    trade: "landscaper",
    city: "Fresno",
    state: "CA",
    email: "sjlawnlandscape@gmail.com",
  },
  // Bakersfield, CA
  {
    firstName: "Owner",
    businessName: "Oilfield City Electric",
    trade: "electrician",
    city: "Bakersfield",
    state: "CA",
    email: "oilfieldcityelectric@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Kern County Cleaning Co",
    trade: "cleaner",
    city: "Bakersfield",
    state: "CA",
    email: "kerncountycleaningco@gmail.com",
  },
  // Baton Rouge, LA
  {
    firstName: "Owner",
    businessName: "Capital City Plumbing Solutions",
    trade: "plumber",
    city: "Baton Rouge",
    state: "LA",
    email: "capitalcityplumbingla@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Bayou State Lawn Care",
    trade: "landscaper",
    city: "Baton Rouge",
    state: "LA",
    email: "bayoustatelawncare@gmail.com",
  },
  // Shreveport, LA
  {
    firstName: "Owner",
    businessName: "Ark-La-Tex Electric Services",
    trade: "electrician",
    city: "Shreveport",
    state: "LA",
    email: "arklateelectricla@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Red River Cleaning Crew",
    trade: "cleaner",
    city: "Shreveport",
    state: "LA",
    email: "redrivercleaningla@gmail.com",
  },
  // Spokane, WA
  {
    firstName: "Owner",
    businessName: "Inland Empire Plumbing & Rooter",
    trade: "plumber",
    city: "Spokane",
    state: "WA",
    email: "inlandempireplumbingwa@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Lilac City Lawn Care",
    trade: "landscaper",
    city: "Spokane",
    state: "WA",
    email: "lilaccitylawncare@gmail.com",
  },
  // Tacoma, WA
  {
    firstName: "Owner",
    businessName: "Sound Electric & Wiring",
    trade: "electrician",
    city: "Tacoma",
    state: "WA",
    email: "soundelectricwa@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Commencement Bay Cleaning",
    trade: "cleaner",
    city: "Tacoma",
    state: "WA",
    email: "commencementbayclean@gmail.com",
  },
  // Knoxville, TN
  {
    firstName: "Owner",
    businessName: "Marble City Plumbing & HVAC",
    trade: "plumber",
    city: "Knoxville",
    state: "TN",
    email: "marblecityplumbingtn@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Smoky Mountain Lawn Solutions",
    trade: "landscaper",
    city: "Knoxville",
    state: "TN",
    email: "smokymtnlawnsolutions@gmail.com",
  },
  // Chattanooga, TN
  {
    firstName: "Owner",
    businessName: "Lookout Mountain Electric",
    trade: "electrician",
    city: "Chattanooga",
    state: "TN",
    email: "lookoutmtnelectric@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Tennessee Valley Clean Co",
    trade: "cleaner",
    city: "Chattanooga",
    state: "TN",
    email: "tnvalleycleaningco@gmail.com",
  },
  // Savannah, GA
  {
    firstName: "Owner",
    businessName: "Low Country Plumbing & Drain",
    trade: "plumber",
    city: "Savannah",
    state: "GA",
    email: "lowcountryplumbingga@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Coastal Georgia Lawn & Landscape",
    trade: "landscaper",
    city: "Savannah",
    state: "GA",
    email: "coastalgalawnscape@gmail.com",
  },
  // Mobile, AL
  {
    firstName: "Owner",
    businessName: "Gulf Coast Electric Services",
    trade: "electrician",
    city: "Mobile",
    state: "AL",
    email: "gulfcoastelectrical@gmail.com",
  },
  {
    firstName: "Owner",
    businessName: "Port City Cleaning & Janitorial",
    trade: "cleaner",
    city: "Mobile",
    state: "AL",
    email: "portcitycleaningal@gmail.com",
  },
];

function buildSubject(_t: Target): string {
  return `Does your business show up after 5pm?`;
}

function buildHtml(t: Target): string {
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
        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">Hi,</p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Quick question: when someone searches for a ${t.trade} in ${t.city} after 5pm on a Tuesday — does your business show up? And if they land on your site, can they request a quote without calling?
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Most local service businesses can't answer yes to both. Those leads quietly go to the next result. You never knew they were there.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          That's the problem <a href="https://groundworklocal.com" style="color:#1a1a2e;">GroundWork</a> solves.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          GroundWork is a website platform built specifically for local service businesses — not Wix, not Squarespace. Something built for the trades, with lead capture and local SEO wired in from day one. It goes live in under an hour. Every page has a lead form and click-to-call built in, your service area is set up for local SEO from the start, and after each job it automatically asks your customer for a review.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          $49/month. 14-day free trial, no credit card required.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          If you're already getting all the leads you want, ignore this. But if you're leaving work on the table because people can't find you easily — it's worth 5 minutes to look.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          <a href="https://groundworklocal.com" style="color:#1a1a2e;">groundworklocal.com</a>
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Happy to answer any questions — just hit reply.
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
  return `Hi,

Quick question: when someone searches for a ${t.trade} in ${t.city} after 5pm on a Tuesday — does your business show up? And if they land on your site, can they request a quote without calling?

Most local service businesses can't answer yes to both. Those leads quietly go to the next result. You never knew they were there.

That's the problem GroundWork solves.

GroundWork is a website platform built specifically for local service businesses — not Wix, not Squarespace. Something built for the trades, with lead capture and local SEO wired in from day one. It goes live in under an hour. Every page has a lead form and click-to-call built in, your service area is set up for local SEO from the start, and after each job it automatically asks your customer for a review.

$49/month. 14-day free trial, no credit card required.

If you're already getting all the leads you want, ignore this. But if you're leaving work on the table because people can't find you easily — it's worth 5 minutes to look.

groundworklocal.com

Happy to answer any questions — just hit reply.

Brad
GroundWork
https://groundworklocal.com
`;
}

async function main() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(`Wave 6 Touch 1 cold outreach — ${TARGETS.length} targets`);

  if (DRY_RUN) {
    console.log("\nDRY RUN — would send to:");
    for (const t of TARGETS) {
      console.log(`  - ${t.email} (${t.businessName}, ${t.city} ${t.state})`);
      console.log(`    Subject: "${buildSubject(t)}"`);
    }
    return;
  }

  const results: { email: string; businessName: string; city: string; state: string; trade: string; status: string; id?: string }[] = [];

  for (const t of TARGETS) {
    try {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: t.email,
        replyTo: "brad@groundworklocal.com",
        subject: buildSubject(t),
        html: buildHtml(t),
        text: buildText(t),
      });

      if (result.error) {
        console.error(`FAILED ${t.email} (${t.businessName}):`, result.error);
        results.push({ email: t.email, businessName: t.businessName, city: t.city, state: t.state, trade: t.trade, status: "failed" });
      } else {
        console.log(`SENT to ${t.email} (${t.businessName}) — id: ${result.data?.id}`);
        results.push({ email: t.email, businessName: t.businessName, city: t.city, state: t.state, trade: t.trade, status: "sent", id: result.data?.id });
      }

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`ERROR sending to ${t.email}:`, err);
      results.push({ email: t.email, businessName: t.businessName, city: t.city, state: t.state, trade: t.trade, status: "error" });
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status !== "sent").length;
  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
  console.log("\nResults:", JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
