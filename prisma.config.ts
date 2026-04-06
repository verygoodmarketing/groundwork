import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7+ configuration — connection URLs live here, not in schema.prisma.
 *
 * DIRECT_URL      — direct connection (not pooled) for CLI commands: migrate, introspect, etc.
 * DATABASE_URL    — pooled connection (PgBouncer) used at runtime via the pg adapter in lib/db/client.ts
 *
 * For local dev without PgBouncer, set both to the same value.
 * Falls back to a placeholder when DIRECT_URL is not set (e.g., during CI generate).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
