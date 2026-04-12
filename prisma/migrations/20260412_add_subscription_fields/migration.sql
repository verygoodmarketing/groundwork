-- CreateEnum
CREATE TYPE "PlanTier" AS ENUM ('STARTER', 'PRO', 'BUSINESS');

-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'TRIAL');

-- AlterTable: add planTier and subscriptionStatus columns
ALTER TABLE "businesses"
  ADD COLUMN IF NOT EXISTS "planTier" "PlanTier",
  ADD COLUMN IF NOT EXISTS "subscriptionStatus" "BillingStatus";

-- AlterTable: make stripeSubscriptionId unique (if not already)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'businesses_stripeSubscriptionId_key'
  ) THEN
    ALTER TABLE "businesses" ADD CONSTRAINT "businesses_stripeSubscriptionId_key" UNIQUE ("stripeSubscriptionId");
  END IF;
END$$;
