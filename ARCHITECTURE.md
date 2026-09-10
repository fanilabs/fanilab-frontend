# FaniLab Frontend Architecture

> **Scope:** this document describes the code on `main` — a single-page showcase site.
> It is **not** a transactional dApp: there is no wallet connection, no data fetching,
> no backend calls, and no on-chain calls in this repository. A fuller dApp architecture
> that this repository once scaffolded is summarised under [History](#history) and is only
> available in git history.

## Overview

The application is one statically-rendered Next.js route (`/`) that composes a marketing /
explainer page for the FaniLab platform. It renders content that is authored as literals in
the component tree; nothing is loaded at runtime. It builds and deploys with zero required
environment variables.

```
Browser
  └── Next.js 16 (App Router), statically rendered
        ├── app/layout.tsx      — <html>, metadata, fonts, Header + Footer
        └── app/page.tsx        — composes 10 section components into <main>
```

There is no client-side data layer, no global state store, and no service/integration layer.
The only client-side state in the app is a single `useState<boolean>` in `Header.tsx` that
toggles the mobile navigation menu.

## Technology

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS 3, with design tokens in `tailwind.config.ts` and `app/globals.css` (`@layer components`) |
| Motion | Framer Motion — scroll-reveal only, gated on `prefers-reduced-motion` |
| Fonts | `next/font/google` — Inter (sans) and JetBrains Mono |
| Unit tests | Vitest + Testing Library (`__tests__/components/`) |
| E2E test | Playwright (`e2e/home.spec.ts`) |
| Tooling | ESLint, Prettier (+ Tailwind plugin), Husky, lint-staged |

Runtime dependencies are exactly `next`, `react`, `react-dom`, and `framer-motion`. There is
no Stellar SDK, Soroban client, wallet SDK, state-management library, data-fetching library,
form library, or validation library in `package.json`.

## Directory layout

```
app/
├── layout.tsx            # Root layout: metadata, viewport, fonts, Header, Footer
├── page.tsx              # Assembles the page from components/sections/*
├── globals.css           # Design tokens + base styles + @layer components
├── icon.svg              # Favicon
└── opengraph-image.tsx   # Open Graph image, generated at the edge (next/og)

components/
├── Header.tsx            # Sticky header + mobile menu (one useState)
├── Footer.tsx            # Footer with external links
├── Logo.tsx              # Inline SVG wordmark
├── ui/
│   ├── SectionHeading.tsx
│   ├── StatusBadge.tsx   # "built" / "progress" / "planned" pill
│   └── Reveal.tsx        # Framer Motion scroll-reveal wrapper
└── sections/             # One component per page section (see below)

lib/
└── links.ts              # Frozen REPO_LINKS and STELLAR_LINKS objects — the single
                          # source of truth for external URLs, imported by Header,
                          # Footer, and several sections
```

`lib/` contains only `links.ts`. There are no `lib/soroban/`, `lib/store/`, `lib/hooks/`,
`lib/validations/`, `lib/errors/`, `lib/contracts.ts`, or `lib/stellar.ts` directories or
files on `main`.

## Page composition

`app/page.tsx` renders these section components in order:

1. `Hero` (uses `HeroDiagram`)
2. `WhatIsFaniLab`
3. `Ecosystem`
4. `HowItWorks`
5. `SmartContractLayer`
6. `Backend`
7. `TrustEscrow`
8. `BuiltForStellar`
9. `ProjectStatus`
10. `OpenSource`

The header navigation links to a subset of these sections by anchor. `ProjectStatus.tsx` is
the on-page "what is built vs. planned" table and is intended to be the source of truth for
platform status — see the note in `README.md`.

## Rendering & data

- **Static rendering.** The route has no dynamic params, no `fetch`, and no server actions;
  `next build` emits it as static HTML.
- **No runtime data.** All copy, lists, and status values are hard-coded in the components.
- **No persistence.** `localStorage`, `sessionStorage`, and cookies are never touched.
- **Open Graph image.** `app/opengraph-image.tsx` runs on the edge runtime and is generated
  at request/build time by `next/og`.

## Security headers

`next.config.js` sets seven response headers for every path: `Strict-Transport-Security`,
`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`,
`Referrer-Policy`, `Permissions-Policy`, and `X-DNS-Prefetch-Control`. There is **no**
`Content-Security-Policy` header configured. See `SECURITY.md` for the full posture.

## Build & deploy

```
git push → GitHub Actions (.github/workflows/ci.yml, Node 22)
             lint · type-check · unit tests · e2e · build · npm audit
           → Vercel (zero-config; no environment variables required)
```

Most CI jobs are configured with `continue-on-error: true`; type-check and build are the
effective gates. See `.github/CI_CD_GUIDE.md`.

`NEXT_PUBLIC_SITE_URL` is the only environment variable the code reads, and it is optional:
it only affects absolute Open Graph / canonical URLs. When unset, the code falls back to
Vercel's `VERCEL_URL`, then to `http://localhost:3000`.

## History

An earlier iteration of this repository scaffolded a transactional dApp UI:

- routes `app/create-delivery/`, `app/deliveries/`, `app/dashboard/`
- Zustand stores and SWR data fetching (`lib/store/`, `lib/hooks/`)
- a Soroban integration layer with **mock** contract calls (`lib/soroban/`, `lib/contracts.ts`)
- Zod validation schemas and a custom error module (`lib/validations/`, `lib/errors/`)
- Freighter wallet connection in the header

That code was removed from `main` in commit `96f3302` ("rebuild frontend as single-page
FaniLab showcase site", 2026-08-13) and can be recovered from git history. The dApp is
expected to be revisited once the smart contracts are deployed to a public network — see the
`ProjectStatus` section on the page and the smart-contract / backend repositories for where
that work stands.
