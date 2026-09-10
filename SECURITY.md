# Security Policy

## Scope

This repository is a **single-page static showcase site**. It has no backend, no API routes,
no database, no authentication, no wallet integration, and no on-chain calls. It renders
hard-coded content and takes no user input beyond in-page navigation. The attack surface is
correspondingly small: static asset delivery and the response headers below.

Security of the FaniLab platform's on-chain and off-chain components lives in the
[smart contract](https://github.com/fanilabs/fanilab-smartcontract) and
[backend](https://github.com/fanilabs/backend) repositories, not here.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Measures actually in place

### Response headers (`next.config.js`)

Set for every path:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-DNS-Prefetch-Control: on`

There is **no** `Content-Security-Policy` header configured.

### Application

- Output is rendered through React, which escapes interpolated values by default. There is no
  `dangerouslySetInnerHTML` in the codebase.
- No client-side persistence: `localStorage`, `sessionStorage`, and cookies are never used.
- No secrets are required or read. The only environment variable the code touches is the
  optional `NEXT_PUBLIC_SITE_URL` (used only to build absolute Open Graph / canonical URLs).
- Dependency surface is minimal — four runtime dependencies (`next`, `react`, `react-dom`,
  `framer-motion`).

### CI

`.github/workflows/ci.yml` runs `npm audit --audit-level=high` on every push and pull
request (non-blocking).

## Not applicable to this repository

The following are sometimes expected of a Stellar dApp frontend but do **not** apply to the
current showcase site, because the corresponding functionality is not present:

- Wallet / Freighter signing, transaction simulation, gas estimation, network validation
- Input validation schemas (there is no user input to validate)
- CSRF protection, API authentication, rate limiting (there is no API)
- Client-side state stores and persisted state
- Error-boundary components

If the transactional dApp UI is reintroduced (see `ARCHITECTURE.md` → History), this policy
should be revised to cover it.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Report them by email to **security@fanilab.com**. Include:

- a description of the issue,
- steps to reproduce,
- potential impact,
- a suggested fix, if you have one.

### What to expect

- **Initial response:** within 48 hours
- **Status update:** within 7 days
- **Fix timeline:** depends on severity

We do not currently run a bug-bounty program, but we appreciate responsible disclosure.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Stellar Security](https://developers.stellar.org/docs/learn/security)
- [Next.js security headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
