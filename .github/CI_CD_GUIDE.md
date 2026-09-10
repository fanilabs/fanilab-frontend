# CI/CD Pipeline Guide

Describes `.github/workflows/ci.yml`. The workflow runs on pushes and pull requests to
`main` and `develop`, on Node 22.

## Current Status

Most jobs are configured with `continue-on-error: true`, so a red check on those jobs does
not block a merge. **Type check** and **Build** are the effective gates — they are not
marked `continue-on-error`.

## Pipeline Jobs

### 1. Lint and Type Check
- ESLint (`npm run lint`) — non-blocking
- TypeScript (`npm run type-check`) — **blocking**
- Prettier format check (`npm run format:check`) — non-blocking

### 2. Unit Tests
- Runs Vitest (`npm run test`) — non-blocking
- Uploads coverage to Codecov — non-blocking

### 3. E2E Tests
- Installs Playwright browsers, builds the app, runs `npm run test:e2e` — non-blocking
- Uploads the Playwright report artifact

### 4. Build
- `npm run build` — **blocking**; needs job 1 to have run
- Uploads the `.next/` build artifact

### 5. Security Scan
- `npm audit --audit-level=high` — non-blocking

### 6. ⏭️ Deploy Preview
**Status:** Skipped (needs Vercel secrets)
- Only runs on pull requests
- Requires Vercel configuration

### 7. ⏭️ Deploy Production
**Status:** Skipped (needs Vercel secrets)
- Only runs on main branch pushes
- Requires Vercel configuration

### 6. Deploy Preview / 7. Deploy Production
Both are gated on `github.repository == 'fanilabs/fanilab-frontend'` and on `VERCEL_TOKEN`
being set, so they are skipped on forks and wherever the Vercel secrets are absent.

## Why lint/test/audit jobs are non-blocking

`continue-on-error: true` is set on the lint, format, unit-test, e2e, and `npm audit` steps
deliberately: this is a small static showcase site with a correspondingly small test suite,
and those signals are treated as advisory. Type check and build are the checks that must
stay green. If the transactional dApp UI is reintroduced, revisit whether the test jobs
should become blocking.

## Adding Vercel deployment

1. Repository **Settings → Secrets and variables → Actions**
2. Add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

Note: Vercel can also deploy this repository directly via its GitHub integration, with no
workflow secrets and no configuration (no environment variables are required).

## Understanding the Badges

CI badge for `README.md`:

```markdown
[![CI/CD](https://github.com/fanilabs/fanilab-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/fanilabs/fanilab-frontend/actions/workflows/ci.yml)
```

## Disabling CI/CD Temporarily

If you want to disable CI/CD temporarily:

1. Rename `.github/workflows/ci.yml` to `.github/workflows/ci.yml.disabled`
2. Commit and push

To re-enable:

1. Rename back to `.github/workflows/ci.yml`
2. Commit and push

## Questions?

- Check the Actions tab in the GitHub repository
- Review individual job logs for details
- Type check and build are the required checks; the rest are advisory
