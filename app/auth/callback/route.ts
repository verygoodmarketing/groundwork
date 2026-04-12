import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Supabase Auth callback — handles OAuth redirects (e.g. Google).
 * Exchanges the one-time code for a session, then redirects.
 *
 * If the user has already completed onboarding (onboardingComplete === true),
 * they are sent directly to /dashboard. New users go to /onboarding/step-2.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.user) {
      // If an explicit `next` param was provided, honour it.
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      // Check whether the user has already completed onboarding so we can
      // skip straight to the dashboard for returning users.
      try {
        const owner = await prisma.businessOwner.findUnique({
          where: { userId: data.user.id },
          select: { business: { select: { onboardingComplete: true } } },
        });

        if (owner?.business?.onboardingComplete) {
          return NextResponse.redirect(`${origin}/dashboard`);
        }
      } catch {
        // If the DB check fails for any reason, fall through to the default.
      }

      // New user or incomplete onboarding — use the smart hub which will
      // resume at the correct step.
      return NextResponse.redirect(`${origin}/onboarding`);
    }
  }

  // Something went wrong — redirect to step 1 with an error hint
  return NextResponse.redirect(`${origin}/onboarding/step-1?error=auth_callback_failed`);
}
