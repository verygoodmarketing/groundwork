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
  process.env.FROM_EMAIL || "Brad at Groundwork <brad@time.verygoodmarketing.com>";
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

function buildSubject(t: Target): string {
  return `Quick question — is ${t.businessName} showing up on Google?`;
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
          <img src="https://groundworklocal.com/brand/bimi-logo.svg" alt="Groundwork" width="36" height="36" style="display:inline-block;vertical-align:middle;border-radius:7px;" />
        </p>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">${greeting},</p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          I was looking for ${t.trade} help in ${t.city} and came across ${t.businessName}.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Quick question: when someone searches Google for a ${t.trade} in ${t.city}, are they finding you?
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          I ask because most local ${t.trade} businesses I talk to rely on referrals and word-of-mouth — which is great, but it means they're invisible to the 78% of people who search online before they hire anyone.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          I built <a href="https://groundworklocal.com" style="color:#1a1a2e;">Groundwork</a> to fix that. It gets local service businesses online fast — professional website, local SEO, and a lead form that actually works — in under an hour, starting at $49/month.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Would a quick 15-minute call make sense? I can show you exactly how it looks for a ${t.trade} business in ${t.city}.
        </p>

        <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#333333;">
          Just reply here or grab a time: <a href="${CALENDAR_LINK}" style="color:#1a1a2e;">${CALENDAR_LINK}</a>
        </p>

        <p style="margin:0 0 4px 0;font-size:16px;line-height:26px;color:#333333;">Brad</p>
        <p style="margin:0 0 24px 0;font-size:14px;line-height:22px;color:#888888;">
          Groundwork<br>
          <a href="https://groundworklocal.com" style="color:#888888;">groundworklocal.com</a>
        </p>

        <p style="margin:0;font-size:13px;line-height:20px;color:#aaaaaa;">
          P.S. 14-day free trial, no credit card required — nothing to lose.
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

I was looking for ${t.trade} help in ${t.city} and came across ${t.businessName}.

Quick question: when someone searches Google for a ${t.trade} in ${t.city}, are they finding you?

I ask because most local ${t.trade} businesses I talk to rely on referrals and word-of-mouth — which is great, but it means they're invisible to the 78% of people who search online before they hire anyone.

I built Groundwork to fix that. It gets local service businesses online fast — professional website, local SEO, and a lead form that actually works — in under an hour, starting at $49/month.

Would a quick 15-minute call make sense? I can show you exactly how it looks for a ${t.trade} business in ${t.city}.

Just reply here or grab a time: ${CALENDAR_LINK}

Brad
Groundwork
https://groundworklocal.com

P.S. 14-day free trial, no credit card required — nothing to lose.
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
