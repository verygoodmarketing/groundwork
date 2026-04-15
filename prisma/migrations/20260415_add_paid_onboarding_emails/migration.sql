-- AlterTable: add paid onboarding email tracking fields
-- paidSubscriptionStartedAt: set when a paid (non-trial) subscription first activates.
-- paidOnboardingDayNSentAt:   idempotency guards — set after each email is sent.
ALTER TABLE "businesses"
  ADD COLUMN IF NOT EXISTS "paidSubscriptionStartedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "paidOnboardingDay1SentAt"  TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "paidOnboardingDay3SentAt"  TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "paidOnboardingDay7SentAt"  TIMESTAMP(3);
