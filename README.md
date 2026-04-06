# Versa — Websites & Marketing for Local Businesses

Versa helps small service businesses (plumbers, cleaners, landscapers, photographers, etc.) build a professional online presence, get discovered, and grow their customer base.

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js (latest stable, App Router) | SSR/SEO, ecosystem, Vercel native |
| Language | TypeScript | Type safety end-to-end |
| API | tRPC + Next.js API routes | Zero schema drift, type-safe RPC |
| Database | Supabase Postgres | Hosted Postgres + auth + storage bundled |
| ORM | Prisma | Type-safe, great migrations |
| Hosting | Vercel | Next.js native, wildcard domains |
| Site Builder | Custom (Tiptap + templates) | Core product differentiation |
| Transactional Email | Resend | Developer-first, React Email |
| Marketing Email | Loops | SMB campaign automation |
| Auth | Supabase Auth | Bundled, robust |
| Payments | Stripe | Industry standard |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge                       │
│  Next.js App (App Router + RSC)                     │
│  ├── Marketing site (static, ISR)                   │
│  ├── Business sites ({slug}.domain.com, SSG/ISR)    │
│  └── Admin dashboard (client + server components)   │
└─────────────────────────────────────────────────────┘
         │ tRPC │ API Routes
┌─────────────────────────────────────────────────────┐
│                  Supabase                            │
│  ├── Postgres (multi-tenant data model)             │
│  ├── Auth (business owner login)                    │
│  └── Storage (business media)                       │
└─────────────────────────────────────────────────────┘
         │                    │
   Resend (tx email)     Loops (mktg email)
         │
   Stripe (payments)
```

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public marketing site (static)
│   ├── dashboard/          # Business owner dashboard
│   ├── api/
│   │   └── trpc/[trpc]/    # tRPC API handler
│   ├── layout.tsx          # Root layout with TRPCProvider
│   └── globals.css
│
├── server/                 # tRPC backend
│   ├── trpc.ts             # tRPC init, context, procedures
│   ├── root.ts             # Root router (compose all routers)
│   └── routers/
│       ├── business.ts     # Business CRUD
│       ├── site.ts         # Site builder CRUD
│       └── contact.ts      # Contact form + CRM
│
├── lib/
│   ├── trpc/
│   │   ├── client.ts       # React hooks factory
│   │   └── provider.tsx    # TRPCProvider component
│   ├── supabase/
│   │   ├── server.ts       # Server-side Supabase client
│   │   └── client.ts       # Browser-side Supabase client
│   └── db/
│       └── client.ts       # Prisma singleton
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
│
├── components/
│   ├── ui/                 # Reusable UI primitives
│   └── site-editor/        # Block-based site editor
│
├── types/                  # Shared TypeScript types
├── public/                 # Static assets
├── docs/                   # Internal documentation
│
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint, typecheck, build on every PR
│       └── deploy.yml      # Deploy to Vercel on main
│
├── middleware.ts           # Supabase auth + route protection
├── .env.example            # Environment variable template
└── .env.local              # Your local env (git-ignored)
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm 11+
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

### 1. Clone and install

```bash
git clone https://github.com/verygoodmarketing/versa.git
cd versa
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`:

- **Supabase**: Get `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`, and `DIRECT_URL` from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/database).
- **Stripe**: Get keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
- **Resend**: Get API key from [Resend](https://resend.com/api-keys).
- **Loops**: Get API key from [Loops Settings](https://app.loops.so/settings?page=api).

### 3. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to your Supabase database (dev)
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Database Studio (optional)

```bash
npm run db:studio
```

Opens Prisma Studio at [http://localhost:5555](http://localhost:5555) for browsing/editing data.

## Development Workflow

### Branching

- `main` — production-ready, auto-deploys to Vercel production
- `develop` — integration branch for feature PRs
- `feat/your-feature` — feature branches, PR into `develop`

### CI/CD

Every push and PR triggers:
1. **ESLint** — code style and quality checks
2. **TypeScript** — `tsc --noEmit` type checking
3. **Build** — full Next.js build to catch runtime errors

On merge to `main`:
1. Auto-deploy to Vercel production
2. Run Prisma migrations against production database

### Adding a tRPC procedure

1. Add your procedure to the relevant router in `server/routers/`
2. If it's a new domain, create a new router file and add it to `server/root.ts`
3. Use `protectedProcedure` for authenticated routes, `publicProcedure` for public ones
4. Use `trpc.yourRouter.yourProcedure.useQuery()` or `.useMutation()` in Client Components

### Database changes

```bash
# Edit prisma/schema.prisma, then:
npm run db:migrate   # creates a migration file and applies it

# Never use db:push in production — always use migrations
```

## Deployment

### Vercel (Production)

The project is deployed to the `very-good-marketing` Vercel team: [vercel.com/very-good-marketing](https://vercel.com/very-good-marketing).

- **Vercel project**: `versa` (`prj_A6ZfsCilCtUYf76ehT9YxI76SGec`)
- **Vercel org**: `team_wfvPuAOvYcBXvGumlMRtY9iQ`
- Vercel auto-deploys from GitHub via the Vercel GitHub integration
- Additional GitHub Actions workflow (`deploy.yml`) handles post-deploy Prisma migrations

### Required GitHub Actions Secrets

Set these in your GitHub repo settings under **Settings > Secrets and Variables > Actions**:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token (from [vercel.com/account/tokens](https://vercel.com/account/tokens)) |
| `VERCEL_ORG_ID` | `team_wfvPuAOvYcBXvGumlMRtY9iQ` |
| `VERCEL_PROJECT_ID` | `prj_A6ZfsCilCtUYf76ehT9YxI76SGec` |
| `DATABASE_URL` | Prisma connection string (pooled) |
| `DIRECT_URL` | Prisma direct connection (for migrations) |

### Multi-tenant subdomain setup

Each business gets `{slug}.verygoodmarketing.com`. To enable this on Vercel:

1. Add a wildcard domain `*.verygoodmarketing.com` in Vercel project settings
2. Configure DNS: `CNAME *.verygoodmarketing.com -> cname.vercel-dns.com`
3. Next.js middleware reads the subdomain from `request.headers.get('host')` to resolve the business

## Contributing

- All PRs require: passing CI, at least one review
- Commits: use conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- TypeScript: no `any`, no `ts-ignore` without justification
- Prisma: never edit migration files after they've been applied

## License

Proprietary — all rights reserved.
