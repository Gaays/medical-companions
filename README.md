# China Health Check Guide

Nuxt 3 SSR application for Vercel deployment. News articles and consultation form submissions are stored through Supabase server APIs.

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Create the Supabase tables with [doc/supabase-schema.sql](doc/supabase-schema.sql), then set these environment variables locally and in Vercel:

- `NUXT_SUPABASE_URL`
- `NUXT_SUPABASE_SERVICE_ROLE_KEY`
- `NUXT_ADMIN_PASSWORD`
- `NUXT_PUBLIC_SITE_URL`

## Commands

```bash
pnpm dev
pnpm build
pnpm preview
```

## Routes

- `/` home page
- `/services` consultation services
- `/news` SSR news list
- `/news/:slug` SSR article detail
- `/admin/news` password-protected news admin

## Vercel

The Nuxt Nitro preset is set to `vercel` in `nuxt.config.ts`. In Vercel, use pnpm as the package manager and `pnpm build` as the build command.
