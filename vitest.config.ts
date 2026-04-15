import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    // Stub env vars required by module-level guards so imports don't throw
    env: {
      STRIPE_SECRET_KEY: "sk_test_stub_for_tests",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json"],
      include: ["lib/**/*.ts"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
