@AGENTS.md

# CLAUDE.md

## Project

Baked for Sofia — Melbourne-based wholesale artisan bakery website. Multi-page site with Home, Products, Our Story, and Contact pages.

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
```

## Tech Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 + shadcn/ui (base-ui variant)
- Framer Motion (scroll-triggered animations)
- react-hook-form + zod (form validation)
- Server Actions → external webhook

## Architecture

- `src/app/layout.tsx` — Root layout: `<html lang="en">`, DM Sans font, Header + Footer
- `src/app/page.tsx` — Home page: Hero, FeatureHighlights, ProductCategories, AboutPreview, DeliveryInfo, SupportingLocal, HomeCTA
- `src/app/products/page.tsx` — Products page with 6 category cards
- `src/app/our-story/page.tsx` — About page with story, values, supporting local
- `src/app/contact/page.tsx` — Contact page with wholesale inquiry form
- `src/components/sections/` — Page section components with Framer Motion animations
- `src/components/animated-section.tsx` — Reusable scroll-triggered animation wrapper
- `src/app/actions/submit-lead.ts` — Server Action: validates with zod, POSTs to `WEBHOOK_URL`
- `src/lib/validations.ts` — Zod schema for wholesale inquiry (AU phone: `^0[2-9]\d{8}$`)

## Key Patterns

- LTR English site
- Modern clean palette: terracotta primary, sage green accent, warm cream background
- shadcn/ui uses base-ui (no `asChild` prop — use `buttonVariants` with Link instead)
- All section animations use `AnimatedSection` wrapper

## Environment Variables

- `WEBHOOK_URL` — External webhook endpoint (server-only)
