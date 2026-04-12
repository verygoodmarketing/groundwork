import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/client";
import { stripe } from "@/lib/stripe/client";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://versa-kohl.vercel.app";

/**
 * POST /api/stripe/portal
 * Creates a Stripe Billing Portal session and redirects the user.
 * Used as a server action-like form POST from the dashboard.
 */
export async function POST(req: NextRequest) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/onboarding/step-1", req.url));
  }

  const owner = await prisma.businessOwner.findUnique({
    where: { userId: user.id },
    include: { business: true },
  });

  if (!owner || !owner.business.stripeCustomerId) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: owner.business.stripeCustomerId,
      return_url: `${APP_URL}/dashboard`,
    });
    return NextResponse.redirect(session.url);
  } catch {
    return NextResponse.redirect(new URL("/dashboard?billing_error=1", req.url));
  }
}
