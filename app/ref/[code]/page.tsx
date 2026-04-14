import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getReferralCodeRecord } from "@/lib/referral/utils";

interface Props {
  params: { code: string };
}

/**
 * /ref/[code] — Referral landing page.
 *
 * When a trade pro clicks a referral link:
 * 1. Validate the referral code against DB.
 * 2. Store the code in a cookie (30-day expiry) for attribution on signup.
 * 3. Redirect to /onboarding/step-1 with a `next=/pricing` hint so new users
 *    see pricing after completing onboarding.
 *
 * Invalid codes fall back gracefully to normal signup flow.
 */
export default async function RefPage({ params }: Props) {
  const { code } = params;

  const record = await getReferralCodeRecord(code);

  if (!record) {
    // Invalid or expired code — silent fallback to normal onboarding
    redirect("/onboarding/step-1");
  }

  // Set a cookie so the referral is captured at signup/onboarding time
  const cookieStore = await cookies();
  cookieStore.set("ref_code", code, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  // Render the referral landing page — CMO copy from spec
  const referrerName = record.business.name ?? "A fellow trade pro";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Groundwork wordmark */}
        <div className="mb-8">
          <span className="font-display font-bold text-2xl text-gray-900">Groundwork</span>
        </div>

        {/* CMO copy: thank-you message for new user */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl font-bold text-gray-900 leading-tight">
            {referrerName} thinks you&rsquo;re worth sharing with.
          </h1>
          <p className="text-gray-600 text-lg font-body">
            You&rsquo;ve been referred by a fellow trade pro. Sign up and your first paid month is
            on us &mdash; no strings attached.
          </p>
        </div>

        {/* Economics callout */}
        <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-sm text-green-800 font-body space-y-1">
          <p className="font-semibold text-base">Free month applied automatically</p>
          <p>
            After your trial ends, your first paid month is free. {referrerName} gets a free month
            too when you activate.
          </p>
        </div>

        {/* CTA */}
        <a
          href={`/onboarding/step-1?next=/pricing&ref=${code}`}
          className="inline-block w-full rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-6 py-4 transition-colors font-body"
        >
          Start Free Trial
        </a>

        {/* Small print from spec */}
        <p className="text-xs text-gray-400 font-body">
          Free month applied after trial period. Referrer also receives a free month when you
          activate your paid plan.
        </p>
      </div>
    </div>
  );
}
