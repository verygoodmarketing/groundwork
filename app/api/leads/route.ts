import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

/**
 * POST /api/leads
 *
 * Accepts lead magnet opt-in form submissions. Validates email, stores the
 * lead in the `leads` table with the source page URL. Email delivery (via
 * Resend) will be wired up in a follow-up task.
 */
export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, sourcePage } = body as Record<string, unknown>;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSource =
    typeof sourcePage === "string" && sourcePage.trim()
      ? sourcePage.trim()
      : null;

  try {
    const lead = await prisma.lead.create({
      data: {
        email: normalizedEmail,
        sourcePage: normalizedSource,
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/leads] Failed to insert lead:", err);
    return NextResponse.json(
      { error: "Failed to save your email. Please try again." },
      { status: 500 }
    );
  }
}
