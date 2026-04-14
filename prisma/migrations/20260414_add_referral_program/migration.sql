-- CreateEnum
CREATE TYPE "ReferralStatus" AS ENUM ('PENDING', 'CONVERTED', 'REWARDED', 'EXPIRED');

-- CreateTable: referral_codes (one per business, their shareable code)
CREATE TABLE "referral_codes" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable: referrals (tracks each referral relationship)
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "referrerBusinessId" TEXT NOT NULL,
    "referredBusinessId" TEXT,
    "referralCode" TEXT NOT NULL,
    "status" "ReferralStatus" NOT NULL DEFAULT 'PENDING',
    "referredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "convertedAt" TIMESTAMP(3),
    "rewardedAt" TIMESTAMP(3),

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: unique business per referral_codes
CREATE UNIQUE INDEX "referral_codes_businessId_key" ON "referral_codes"("businessId");

-- CreateIndex: unique code per referral_codes
CREATE UNIQUE INDEX "referral_codes_code_key" ON "referral_codes"("code");

-- CreateIndex: unique referral code per referrals row
CREATE UNIQUE INDEX "referrals_referralCode_key" ON "referrals"("referralCode");

-- AddForeignKey: referral_codes -> businesses
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: referrals -> referrer business
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerBusinessId_fkey" FOREIGN KEY ("referrerBusinessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: referrals -> referred business (nullable, set null on delete)
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referredBusinessId_fkey" FOREIGN KEY ("referredBusinessId") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
