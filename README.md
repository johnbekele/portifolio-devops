# v0-dev-ops-portfolio-website

Personal portfolio site (Next.js 16 App Router). All section content lives in
**Turso** (libSQL) and is editable through the Google-OAuth-protected `/admin`
area. Reads stay statically cached at the edge with `unstable_cache` + tag
revalidation, so admin edits publish instantly without rebuilding.

## Architecture at a glance

```
Visitor ─→ Vercel Edge CDN ─→ RSC (app/page.tsx)
                                  │
                                  ├ getHero, getAbout, getExperiences, ...
                                  │   (unstable_cache, tagged)
                                  ▼
                                Turso (libSQL)

Admin ─→ /admin (Auth.js + Google) ─→ Server Action ─→ Turso
                                              │
                                              └ updateTag('experiences') ─→ next visitor sees fresh data
```

Public route is statically rendered; admin routes are dynamic.

## Local setup

### 1. Install

```bash
pnpm install
```

### 2. Configure environment

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

You need credentials for four things — see sections below.

### 3. Create the Turso database

[Turso](https://turso.tech) free tier gives you 9 GB and 1B row reads/month.

```bash
# Install CLI: https://docs.turso.tech/cli/installation
turso auth signup
turso db create portfolio
turso db show portfolio --url        # -> TURSO_DATABASE_URL
turso db tokens create portfolio     # -> TURSO_AUTH_TOKEN
```

### 4. Create a Google OAuth client

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Create OAuth client ID → Web application.
3. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://YOUR_DOMAIN/api/auth/callback/google` (prod)
4. Copy Client ID + Secret into `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
5. Generate `AUTH_SECRET`: `openssl rand -base64 32`.
6. Set `ADMIN_EMAILS` to a comma-separated list of allowed Google emails.

### 5. Set up Vercel Blob

1. In your Vercel project: Storage → Blob → Create.
2. Copy the read/write token into `BLOB_READ_WRITE_TOKEN`.
3. Pull env locally for dev: `vercel env pull .env.local`.

### 6. Migrate and seed

```bash
pnpm db:migrate     # apply schema
pnpm db:seed        # import the original static content
```

The seed script ports every existing array (experiences, projects, skills,
certifications, about paragraphs, hero info) into Turso rows so the site
looks identical to before.

### 7. Run

```bash
pnpm dev
```

Visit `http://localhost:3000` for the public site, `http://localhost:3000/admin`
to sign in and edit.

## Editing content

| Section        | Admin URL                       |
| -------------- | ------------------------------- |
| Hero / profile | `/admin/hero`                   |
| About          | `/admin/about`                  |
| Experience     | `/admin/experience`             |
| Projects       | `/admin/projects`               |
| Skills         | `/admin/skills`                 |
| Certifications | `/admin/certifications`         |

Every save calls `updateTag(...)` for the touched section so the public site
reflects changes on the next request — no redeploy.

## Scripts

```bash
pnpm dev            # local dev server
pnpm build          # production build
pnpm db:generate    # generate a new migration after editing db/schema.ts
pnpm db:migrate     # apply migrations to TURSO_DATABASE_URL
pnpm db:seed        # one-time seed
pnpm db:studio      # open Drizzle Studio against your Turso DB
```

## Project layout

```
app/
  page.tsx                     RSC, fetches all sections in parallel
  page-shell.tsx               client wrapper for scroll / active section
  admin/
    login/page.tsx             public Google sign-in
    (dash)/                    protected route group (layout enforces auth)
      page.tsx                 dashboard
      hero/                    each section's edit pages
      about/
      experience/[id]/         CRUD per item
      projects/[id]/
      skills/[id]/
      certifications/[id]/
  api/
    auth/[...nextauth]/        Auth.js handler
    upload/                    admin-only Vercel Blob upload endpoint
components/                    section + UI components (presentational RSC)
db/
  schema.ts                    Drizzle schema (single file)
  index.ts                     libSQL client
  migrations/                  generated SQL
  seed.ts                      ports static content into DB
lib/
  auth.ts                      Auth.js config + isAdminEmail / requireAdmin
  blob.ts                      Vercel Blob helpers
  data/*.ts                    cached read functions per section
  actions/*.ts                 Server Actions (mutations + updateTag)
  icons.ts                     Lucide icon name → component map
  tags.ts                      cache tag constants
proxy.ts                       Auth-based gate for /admin/*
```

## Deploying to Vercel

1. Push the repo and import into Vercel.
2. Add the same env vars from `.env.local.example` in Project Settings → Env.
3. Add `pnpm db:migrate` as a build hook _or_ run it once locally against the
   production Turso URL before the first deploy.
4. Run `pnpm db:seed` once if you want the initial content imported (skip if
   you'll add everything via the admin UI).
5. After first deploy, sign in to `https://YOUR_DOMAIN/admin` with one of the
   `ADMIN_EMAILS` Google accounts.
