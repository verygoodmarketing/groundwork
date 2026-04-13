# Groundwork — Code & Architecture Conventions

## File Naming

- React components: `PascalCase.tsx`
- Utilities, hooks, helpers: `camelCase.ts`
- Route files: `page.tsx`, `layout.tsx`, `route.ts` (Next.js conventions)
- Prisma schema: `schema.prisma`
- GitHub Actions: `kebab-case.yml`

## TypeScript

- **No `any`** — use `unknown` and narrow, or explicit types
- **No `@ts-ignore`** without a comment explaining why
- Prefer explicit return types on exported functions
- Use `zod` for all runtime validation (API inputs, form data)
- Use Prisma-generated types; do not re-declare model shapes manually

## tRPC conventions

- All procedures live in `server/routers/`
- One router file per domain (`business.ts`, `site.ts`, `contact.ts`, etc.)
- Use `protectedProcedure` for anything requiring a logged-in user
- Use `publicProcedure` for public-facing endpoints (contact forms, site rendering)
- Input validation uses `zod` schemas defined inline in the procedure
- Router composed in `server/root.ts` — add new routers there

## React / Next.js

- **Server Components by default** — only add `"use client"` when you need interactivity or browser APIs
- Data fetching in Server Components using `server/trpc.ts` server-side caller (not `trpc.useQuery`)
- `trpc.*.useQuery()` / `trpc.*.useMutation()` only in Client Components
- Layouts for persistent UI (nav, sidebar); pages for route-specific content
- Route groups `(marketing)`, `(dashboard)` to isolate layouts

## Database / Prisma

- All models in `prisma/schema.prisma` — one source of truth
- Use `cuid()` for all primary keys
- Always use migrations (`prisma migrate dev`) — never `db push` in production
- Soft deletes: add `deletedAt DateTime?` if needed; never hard-delete user data
- Multi-tenancy: every model linked to `businessId` — always filter by business in queries

## Supabase Auth

- Supabase Auth manages user sessions (JWTs via cookies)
- `lib/supabase/server.ts` for Server Components and tRPC context
- `lib/supabase/client.ts` for Client Components
- `middleware.ts` handles session refresh on every request
- Business owner user ID stored as `userId` in `BusinessOwner` model (maps to Supabase `auth.users.id`)

## Environment Variables

- `NEXT_PUBLIC_*` prefix for client-accessible vars
- Never commit `.env.local` — use `.env.example` as documentation
- All vars documented in `.env.example` with comments

## Git

- Branch naming: `feat/description`, `fix/description`, `chore/description`
- Commit messages: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- PR title = commit message style
- Squash merge PRs into `main` and `develop`
- `main` is always deployable

## CI/CD

- Every PR runs: lint → typecheck → build
- Only `main` deploys to production
- Migrations run after deploy (never before — schema forward-compatible)
