/**
 * GET /api/unsubscribe?id={businessId}&token={hmacToken}
 *
 * Handles one-click unsubscribe from trial nurture emails (CAN-SPAM compliance).
 *
 * The token is an HMAC-SHA256 of the businessId signed with UNSUBSCRIBE_SECRET.
 * This prevents anyone from unsubscribing arbitrary businesses by guessing IDs.
 *
 * On success: sets business.nurtureEmailsOptOut = true and redirects to a
 * confirmation page. Future cron runs will skip this business.
 */
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

export const dynamic = "force-dynamic";

function verifyToken(businessId: string, token: string): boolean {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET environment variable is required");
  const expected = createHmac("sha256", secret)
    .update(businessId)
    .digest("hex");
  // Constant-time comparison to prevent timing attacks
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://app.verygoodmarketing.com";

  if (!id || !token) {
    return NextResponse.redirect(`${appUrl}/unsubscribe?error=invalid`);
  }

  if (!verifyToken(id, token)) {
    return NextResponse.redirect(`${appUrl}/unsubscribe?error=invalid`);
  }

  try {
    await prisma.business.update({
      where: { id },
      data: { nurtureEmailsOptOut: true },
    });
    console.log(`[unsubscribe] Business ${id} opted out of nurture emails`);
  } catch (err) {
    console.error(`[unsubscribe] Failed to opt out business ${id}:`, err);
    return NextResponse.redirect(`${appUrl}/unsubscribe?error=server`);
  }

  return NextResponse.redirect(`${appUrl}/unsubscribe?success=true`);
}
