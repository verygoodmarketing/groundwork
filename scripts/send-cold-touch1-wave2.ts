/**
 * Send Touch 1 cold outreach emails to Wave 2 local service business targets.
 *
 * Wave 2 leads sourced from VER-205. Only direct-email targets are included here.
 * BBB contact-form-only leads are skipped (cannot be automated) — flagged separately for board.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx DRY_RUN=true npx tsx scripts/send-cold-touch1-wave2.ts
 *   RESEND_API_KEY=re_xxx npx tsx scripts/send-cold-touch1-wave2.ts
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

/**
 * Wave 2 — Direct-email targets only (2/20).
 * Remaining 18 leads are BBB contact-form-only and are flagged below for board follow-up.
 */
const TARGETS: Target[] = [
  {
    firstName: "Owner",
    businessName: "LawnLux Landcare",
    trade: "landscaper",
    city: "Wichita",
    state: "KS",
    email: "lawnluxlandcare@gmail.com",
  },
  {
    firstName: "Eric",
    businessName: "EA Heating & Cooling",
    trade: "HVAC contractor",
    city: "El Paso",
    state: "TX",
    email: "info@eaheatingandcooling.com",
  },
];

/**
 * BBB contact-form-only leads — skipped in automation, flagged for board manual outreach.
 * These require visiting the BBB profile and submitting a contact form manually.
 */
export const BBB_CONTACT_FORM_LEADS = [
  { name: "Morval Plumbing Inc", type: "Plumber", city: "Fresno", state: "CA", bbb: "bbb.org/us/ca/fresno/profile/plumber/morval-plumbing-inc-1126-850110548" },
  { name: "K&C Landscaping", type: "Landscaper", city: "Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/landscape-contractors/kc-landscaping-0714-1000068405" },
  { name: "Aaron Lawn Service", type: "Landscaper", city: "Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/lawn-maintenance/aarons-lawn-service-0714-1000056992" },
  { name: "Eco-Bright Industries LLC", type: "Cleaner", city: "Tulsa", state: "OK", bbb: "bbb.org/us/ok/tulsa/profile/cleaning-services/eco-bright-industries-llc-1025-38049346" },
  { name: "Perfectly Clean Commercial Cleaning LLC", type: "Cleaner", city: "Tulsa", state: "OK", bbb: "bbb.org/us/ok/tulsa/profile/disinfecting-services/perfectly-clean-commercial-cleaning-services-llc-1025-38092225" },
  { name: "Aaron's Heating & Air Conditioning", type: "HVAC", city: "El Paso", state: "TX", bbb: "bbb.org/us/tx/el-paso/profile/air-conditioning-cleaning/aarons-heating-air-conditioning-0895-99149008" },
  { name: "Mr. Frost Heating & Cooling", type: "HVAC", city: "El Paso", state: "TX", bbb: "bbb.org/us/tx/el-paso/profile/heating-and-air-conditioning/mr-frost-heating-cooling-0895-99151712" },
  { name: "Daniel Lawn and Landscaping Services LLC", type: "Landscaper", city: "Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/lawn-maintenance/daniels-lawn-and-landscaping-services-llc-0714-300100896" },
  { name: "The Greener Side Lawn & Landscape LLC", type: "Landscaper", city: "North Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/lawn-and-garden/the-greener-side-lawn-landscape-llc-0714-1000057409" },
  { name: "Alf Plumbing", type: "Plumber", city: "Fresno", state: "CA", bbb: "bbb.org/us/ca/fresno/profile/plumber/alf-plumbing-1126-850107051" },
  { name: "Benitez Plumbing & Drain Service", type: "Plumber", city: "Fresno", state: "CA", bbb: "bbb.org/us/ca/fresno/profile/plumber/benitez-plumbing-drain-service-1126-1000135897" },
  { name: "Nelson Plumbing", type: "Plumber", city: "Fresno", state: "CA", bbb: "bbb.org/us/ca/fresno/profile/plumber/nelson-plumbing-1126-850098495" },
  { name: "Air Repair HVAC LLC", type: "HVAC", city: "Tulsa", state: "OK", bbb: "bbb.org/us/ok/tulsa/profile/air-conditioning-contractor/air-repair-hvac-llc-1025-38088205" },
  { name: "Gateway Air Conditioning and Sheet Metal Co", type: "HVAC", city: "El Paso", state: "TX", bbb: "bbb.org/us/tx/el-paso/profile/heating-and-air-conditioning/gateway-air-conditioning-and-sheet-metal-co-inc-0895-95040070" },
  { name: "Dominguez Sheet Metal Works Inc", type: "HVAC", city: "El Paso", state: "TX", bbb: "bbb.org/us/tx/el-paso/profile/heating-and-air-conditioning/dominguez-sheet-metal-works-inc-0895-67110001" },
  { name: "Prairie Lawn & Landscape", type: "Landscaper", city: "Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/landscape-contractors/prairie-lawn-landscape-0714-300187786" },
  { name: "Accent Restoration LLC", type: "Cleaner", city: "Tulsa", state: "OK", bbb: "bbb.org/us/ok/tulsa/profile/carpet-and-rug-cleaners/accent-restoration-llc-1025-33000620" },
  { name: "Dragonfly Lawn & Tree Care LLC", type: "Landscaper", city: "Wichita", state: "KS", bbb: "bbb.org/us/ks/wichita/profile/lawn-maintenance/dragonfly-lawn-tree-care-llc-0714-300087855", note: "Has website contact form at dragonflylawnandtree.com — high value" },
];

function buildSubject(t: Target): string {
  return t.firstName === "Owner"
    ? `Quick question — is ${t.businessName} showing up on Google?`
    : `${t.firstName}, is ${t.businessName} showing up on Google?`;
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
  console.log(`Wave 2 Touch 1 cold outreach — ${TARGETS.length} direct-email targets`);
  console.log(`BBB contact-form leads (skipped — board manual action): ${BBB_CONTACT_FORM_LEADS.length}`);

  if (DRY_RUN) {
    console.log("\nDRY RUN — would send to:");
    for (const t of TARGETS) {
      console.log(`  - ${t.email} (${t.businessName}, ${t.city} ${t.state})`);
    }
    console.log("\nBBB form-only leads (need manual board outreach):");
    for (const b of BBB_CONTACT_FORM_LEADS) {
      console.log(`  - ${b.name} (${b.type}, ${b.city} ${b.state})${b.note ? " — " + b.note : ""}`);
    }
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const results: { email: string; businessName: string; status: string; id?: string }[] = [];

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
        results.push({ email: t.email, businessName: t.businessName, status: "failed" });
      } else {
        console.log(`SENT to ${t.email} (${t.businessName}) — id: ${result.data?.id}`);
        results.push({ email: t.email, businessName: t.businessName, status: "sent", id: result.data?.id });
      }

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`ERROR sending to ${t.email}:`, err);
      results.push({ email: t.email, businessName: t.businessName, status: "error" });
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
