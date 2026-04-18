-- Migration: drop stale BUSINESS value from PlanTier enum
-- The schema now only defines STARTER and PRO. BUSINESS was never used in production.

-- Ensure no rows reference the stale value before dropping it
UPDATE "businesses" SET "planTier" = NULL WHERE "planTier" = 'BUSINESS';

-- Recreate the enum without BUSINESS
ALTER TYPE "PlanTier" RENAME TO "PlanTier_old";
CREATE TYPE "PlanTier" AS ENUM ('STARTER', 'PRO');
ALTER TABLE "businesses" ALTER COLUMN "planTier" TYPE "PlanTier" USING ("planTier"::text::"PlanTier");
DROP TYPE "PlanTier_old";
