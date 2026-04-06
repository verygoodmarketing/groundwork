import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma 7+ configuration — connection URLs live here, not in schema.prisma.
 *
 * DIRECT_URL      — direct connection (not pooled) for CLI commands: migrate, introspect, etc.
 * DATABASE_URL    — pooled connection (PgBouncer) used at runtime via the pg adapter in lib/db/client.ts
 *
 * For local dev without PgBouncer, set both to the same value.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
