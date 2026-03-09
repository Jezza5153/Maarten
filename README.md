# Chef & Serve — Dutch B2B Hospitality Staffing Platform

Professioneel keukenpersoneel voor hotels in Amsterdam.

## Quick Start

```bash
cd chef-and-serve
npm install
npx prisma db push      # Create database tables
npx tsx prisma/seed.ts   # Seed 840 chefs, 10 hotels, 6 requests
npm run dev              # Start dev server at http://localhost:3000
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/aanvraag` | 3-step hotel intake form |
| `/aanvraag/bevestiging?id=...` | Shortlist confirmation |
| `/voor-hotels` | SLA & guarantees |
| `/werkwijze` | Screening & process |
| `/login` | Chef magic link (mocked) |
| `/chef/dashboard` | Chef profile + availability |
| `/chefs` | Directory preview |
| `/chef/[slug]` | Individual profile |
| `/admin` | Planner dashboard |
| `/admin/requests/[id]` | Request detail with matches |
| `/admin/chefs` | Chef management table |
| `/chef-huren-amsterdam` | SEO page |
| `/tijdelijke-kok-amsterdam` | SEO page |
| `/banqueting-chef` | SEO page |
| `/pastry-chef-inhuren` | SEO page |
| `/keukenpersoneel-hotel` | SEO page |

## Match Engine (`src/lib/match-engine.ts`)

Deterministic scoring: availability, role (+30 exact), city/radius, languages, certs, reliability, rate, experience, recency. Returns top 10 with Dutch reasons + risks.

## Data (840 chefs, 10 hotels, 6 requests)

Run `npx tsx prisma/seed.ts` to regenerate.

## Stack

Next.js 15, TypeScript, Tailwind CSS, Prisma + SQLite, Lucide React icons.
