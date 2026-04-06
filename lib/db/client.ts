import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma 7 requires a driver adapter — the URL is passed via the adapter,
 * not the constructor. We use @prisma/adapter-pg (native pg driver).
 *
 * DATABASE_URL — pooled connection (PgBouncer) for runtime queries.
 *
 * prisma.config.ts configures DIRECT_URL for CLI migrations.
 *
 * Singleton pattern prevents multiple instances in development due to HMR.
 */
function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
