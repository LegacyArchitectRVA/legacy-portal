# Legacy Architect RVA - Client Portal

Private client portal and Life Manual generation platform for [Legacy Architect RVA](https://legacyarchitectrva.com), a Richmond, VA-based continuity planning service. Legacy Architect RVA helps individuals and business owners document personal, digital, financial, emergency, and household information into a structured **Life Manual**, so a trusted successor can act immediately without confusion.

This repository contains the authenticated client/admin portal that powers that work: chapter-by-chapter data collection, document generation, and client relationship management.

## What's in the Portal

- **Life Manual chapters** — Seven structured chapters (Digital Life, Emergency & Successor Orientation, Financial & Assets, Household Operations, Vital Records, Legacy & Wishes, Business Continuity) where clients enter the information their Life Manual is built from.
- **Life Manual Generator** — Produces a finished, branded Life Manual (HTML and print-ready PDF) from a client's entered data, including a table of contents, cross-referenced sections, and a Legal Documents in Force summary.
- **Document Converter** — Converts AFFiNE-exported documents into branded, polished output.
- **Admin tools** — Client management, a lightweight CRM for prospects and referral partners, messaging between admin and clients, and a Visual Editor for in-place content and copy changes across the site.
- **Readiness Check** — A short client-facing quiz used on the marketing site to gauge a prospect's planning gaps.

## Tech Stack

- **Frontend**: Vite + React + TypeScript, Tailwind CSS, shadcn/ui, Remix Icon
- **Backend**: [Convex](https://convex.dev) (real-time database, auth, server functions)
- **Hosting**: Cloudflare Pages (frontend), Convex Cloud (backend)
- **Auth**: Convex Auth (email/password)

## Local Developments

```bash
# Install dependencies
npm install

# Start the Convex backend (watches for changes)
npx convex dev

# In another terminal, start the frontend
npx vite dev
```

Convex will prompt you to log in and link to the project on first run. The frontend reads the Convex deployment URL from `.env.local`, which `npx convex dev` creates automatically.

## Deploying

This project deploys to Cloudflare Pages via the Wrangler CLI directly. The project does have a GitHub integration on the Cloudflare Pages dashboard, but its automatic deployments are intentionally **disabled** (its build command was empty, so it was publishing the raw, unbuilt repo on every push, do not re-enable it without setting a real build command and output directory first). Pushing to `main` does not trigger a deploy. All deploys are manual, via the steps below.

**Backend (Convex):**

```bash
npx convex deploy
```

**Frontend (Cloudflare Pages):**

```bash
npx vite build
node scripts/inject-convex-url.mjs https://usable-hornet-255.convex.cloud
npx wrangler pages deploy dist --project-name=legacy-portal --commit-dirty=true
```

The `inject-convex-url.mjs` step writes the production Convex URL into the built `index.html`, since the production deployment doesn't use a `.env` file the way local dev does.

## Project Structure

```
├── convex/                    # Backend: schema, queries, mutations, auth
│   ├── schema.ts              # Database schema
│   ├── sections.ts            # Chapter section row/field data
│   ├── crm.ts                 # Client manual data, CRM
│   ├── messages.ts            # Admin/client messaging
│   └── admin.ts               # Admin-only queries and mutations
├── src/
│   ├── data/
│   │   └── chapters.ts        # Canonical Life Manual chapter/section definitions
│   ├── lib/
│   │   ├── documentConverter.ts  # AFFiNE → branded document conversion
│   │   └── brandAssets.ts        # Embedded logo and QR code assets
│   ├── pages/
│   │   ├── ChapterPage.tsx       # Client-facing chapter data entry
│   │   ├── GeneratePage.tsx      # Life Manual Generator (HTML/PDF output)
│   │   ├── IntroductionPage.tsx  # Client introduction & guides
│   │   └── ...                   # Admin, CRM, messaging, settings pages
│   └── components/
└── scripts/
    └── inject-convex-url.mjs  # Injects the prod Convex URL at build time
```

## Notes on the Data Model

- **Life Manual chapters** (the document structure) and the **Readiness Check's seven pillars** (the marketing quiz) are two separate, intentionally similar-sounding systems. They should not be conflated when making changes.
- The canonical chapter order is defined once in `src/data/chapters.ts` and should be treated as the source of truth; the Generator, the Converter, and the live chapter pages all read from it.

## Confidentiality

This repository contains business logic, branding assets, and architecture specific to Legacy Architect RVA. It is private and not licensed for reuse.
