# FaniLab Frontend

> The project showcase site for FaniLab — a blockchain-escrow logistics platform on Stellar.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple.svg)](https://stellar.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## What this is

This repository is a single-page marketing/showcase site: it explains what FaniLab is, the
problem it solves, and how the frontend, backend, and Soroban smart contract repositories fit
together as one platform. It is **not** the transactional application — there is no wallet
connection, no delivery creation flow, and no on-chain calls here. It renders static content and
ships with zero required environment variables.

An earlier iteration of this repository scaffolded a full dApp UI (wallet connect, create/browse
delivery pages, a dashboard). That code has been removed from `main` in favor of this showcase;
it remains in git history and can be revisited once the smart contracts are deployed to a network
the public can use.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **Motion:** Framer Motion (scroll reveals only, respects `prefers-reduced-motion`)
- **Testing:** Vitest + Testing Library (unit), Playwright (e2e smoke test)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
├── layout.tsx           # Metadata, fonts, viewport
├── page.tsx              # Assembles the page from components/sections
├── icon.svg               # Favicon
├── opengraph-image.tsx    # Generated OG image
└── globals.css            # Design tokens & base styles

components/
├── Header.tsx / Footer.tsx
├── Logo.tsx
├── sections/               # One component per page section
└── ui/                     # Reveal, SectionHeading, StatusBadge

lib/
└── links.ts                # Single source of truth for repo/Stellar URLs
```

## Scripts

```bash
npm run dev            # Development server
npm run build           # Production build
npm start                # Serve the production build
npm run lint             # ESLint
npm run type-check       # tsc --noEmit
npm run test              # Vitest
npm run test:e2e          # Playwright
npm run format             # Prettier
```

## Content accuracy

The copy on this site is sourced directly from the FaniLab smart contract and backend
repositories' own documentation (module lists, contract names, verified engineering claims). The
"Project Status" section on the page is the source of truth for what is implemented vs. planned —
keep it updated as the other repositories progress instead of letting this site drift out of
sync.

## Deployment

Deploys to [Vercel](https://vercel.com) with zero configuration — no environment variables are
required. `NEXT_PUBLIC_SITE_URL` is optional and only affects Open Graph/canonical URL
generation; Vercel's own `VERCEL_URL` is used automatically if it's unset.

## Related repositories

- [FaniLab-SmartContract](https://github.com/fanilabs/fanilab-smartcontract) — Soroban smart contracts (Rust)
- [FaniLab-Backend](https://github.com/fanilabs/backend) — off-chain API, indexer, and service layer (Node.js/TypeScript)
- [fanilabs organization](https://github.com/fanilabs)

## License

MIT — see [LICENSE](./LICENSE).
