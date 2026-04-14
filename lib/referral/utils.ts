import { prisma } from "@/lib/db/client";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
const CODE_LENGTH = 8;

/**
 * Generate a random URL-safe referral code.
 * Uses a character set that avoids visually ambiguous chars (0, O, I, l, 1).
 */
function generateCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

/**
 * Get or create a referral code for a business.
 * Creates one on first call; subsequent calls return the existing code.
 */
export async function getOrCreateReferralCode(businessId: string): Promise<string> {
  const existing = await prisma.referralCode.findUnique({
    where: { businessId },
  });

  if (existing) return existing.code;

  // Generate a unique code (retry on collision)
  let code = "";
  let attempts = 0;
  while (attempts < 10) {
    code = generateCode();
    const conflict = await prisma.referralCode.findUnique({ where: { code } });
    if (!conflict) break;
    attempts++;
  }

  if (!code) throw new Error("Failed to generate unique referral code");

  const record = await prisma.referralCode.create({
    data: { businessId, code },
  });

  return record.code;
}

/**
 * Look up a business by referral code.
 * Returns the businessId of the referrer, or null if code is invalid.
 */
export async function getReferralCodeRecord(code: string) {
  return prisma.referralCode.findUnique({
    where: { code },
    include: { business: { select: { id: true, name: true } } },
  });
}

/**
 * Create a pending referral when a referred user signs up.
 * referralCode is the code from the URL they used.
 * referredBusinessId is the new user's business (nullable until onboarding complete).
 */
export async function createPendingReferral({
  referrerBusinessId,
  referralCode,
  referredBusinessId,
}: {
  referrerBusinessId: string;
  referralCode: string;
  referredBusinessId?: string;
}) {
  // Prevent self-referral
  if (referredBusinessId && referredBusinessId === referrerBusinessId) {
    return null;
  }

  // One reward per unique referral code click (idempotent)
  const existing = await prisma.referral.findUnique({
    where: { referralCode },
  });
  if (existing) return existing;

  return prisma.referral.create({
    data: {
      referrerBusinessId,
      referredBusinessId: referredBusinessId ?? null,
      referralCode,
      status: "PENDING",
    },
  });
}

/**
 * Associate a referred business with the pending referral after they complete onboarding.
 */
export async function linkReferredBusiness({
  referralCode,
  referredBusinessId,
  referrerBusinessId,
}: {
  referralCode: string;
  referredBusinessId: string;
  referrerBusinessId: string;
}) {
  // Prevent self-referral
  if (referredBusinessId === referrerBusinessId) return null;

  return prisma.referral.upsert({
    where: { referralCode },
    update: { referredBusinessId },
    create: {
      referrerBusinessId,
      referredBusinessId,
      referralCode,
      status: "PENDING",
    },
  });
}

/**
 * Get referral stats for a business (how many they've referred, converted, rewards earned).
 */
export async function getReferralStats(businessId: string) {
  const referrals = await prisma.referral.findMany({
    where: { referrerBusinessId: businessId },
  });

  return {
    total: referrals.length,
    converted: referrals.filter((r) => r.status === "CONVERTED" || r.status === "REWARDED").length,
    rewarded: referrals.filter((r) => r.status === "REWARDED").length,
  };
}

/**
 * Apply billing credits to both parties when a referred user completes their first paid month.
 * Called from the Stripe webhook (invoice.paid) when the referral is in CONVERTED status.
 */
export async function processReferralReward(referredBusinessId: string): Promise<{
  referral: Awaited<ReturnType<typeof prisma.referral.findFirst>>;
  creditApplied: boolean;
}> {
  // Find a pending/converted referral for this business
  const referral = await prisma.referral.findFirst({
    where: {
      referredBusinessId,
      status: { in: ["PENDING", "CONVERTED"] },
    },
    include: {
      referrerBusiness: { select: { id: true, stripeCustomerId: true, name: true } },
      referredBusiness: { select: { id: true, stripeCustomerId: true, name: true } },
    },
  });

  if (!referral) return { referral: null, creditApplied: false };

  return { referral, creditApplied: false };
}
