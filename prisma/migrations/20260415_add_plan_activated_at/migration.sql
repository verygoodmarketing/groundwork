-- Add planActivatedAt to businesses table
-- Used to schedule post-paid onboarding emails at Day 3 (72h) and Day 7 (168h)
-- after a customer upgrades to a paid plan.

ALTER TABLE "businesses" ADD COLUMN "planActivatedAt" TIMESTAMP(3);
