# Contributing to FaniLab Frontend

Thank you for your interest in contributing to FaniLab! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect differing viewpoints

## Getting Started

### Prerequisites

- Node.js 20+ (CI runs Node 22)
- npm
- Git

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/fanilabs/fanilab-frontend.git
cd fanilab-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

No environment variables are required to run the site. `.env.example` documents the single
optional variable (`NEXT_PUBLIC_SITE_URL`); copy it to `.env.local` only if you need to
override the Open Graph / canonical base URL locally.

### Project Structure

```
fanilab-frontend/
├── app/              # Next.js App Router — layout.tsx, page.tsx, globals.css,
│                     #   icon.svg, opengraph-image.tsx
├── components/       # React components
│   ├── ui/          # SectionHeading, StatusBadge, Reveal
│   └── sections/    # One component per page section
├── lib/
│   └── links.ts     # Frozen external-URL constants (single source of truth)
├── __tests__/       # Vitest component tests
└── e2e/             # Playwright specs
```

See `ARCHITECTURE.md` for how these fit together. Note the site is a static single-page
showcase — there is no Soroban, wallet, state-store, or data-fetching code on `main`.

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### 2. Make Changes

- Write clean, readable code
- Follow existing patterns
- Add comments for complex logic
- Update documentation as needed

### 3. Write Tests

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### 4. Format and Lint

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define explicit types for function parameters and returns
- Avoid `any` type; use `unknown` if needed
- Use interfaces for object shapes

```typescript
// Good
interface SectionProps {
  eyebrow: string;
  title: string;
  description?: string;
}

function SectionHeading(props: SectionProps): JSX.Element {
  // ...
}

// Bad
function SectionHeading(props: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Use prop destructuring
- Reuse the `ui/` primitives (`SectionHeading`, `StatusBadge`, `Reveal`) rather than
  re-implementing them
- Import external URLs from `lib/links.ts`; do not hard-code them in components
- Gate any animation on `prefers-reduced-motion` (see `Reveal.tsx` / `globals.css`)

### File Naming

- Components: PascalCase (`SectionHeading.tsx`)
- Other modules: camelCase (`links.ts`)

## Testing

Tests exercise the rendered page, not blockchain flows.

### Unit Tests (Vitest + Testing Library)

```typescript
// __tests__/components/StatusBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from '@/components/ui/StatusBadge';

describe('StatusBadge', () => {
  it('renders the label for the "built" status', () => {
    render(<StatusBadge status="built" />);
    expect(screen.getByText(/implemented/i)).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('home page renders the hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```

## Pull Request Process

### Before Submitting

- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation updated
- [ ] No console errors in dev mode

### PR Title Format

```
[Type] Short description

Types: feat, fix, docs, refactor, test, chore
```

Examples:
- `[feat] Add ecosystem diagram section`
- `[fix] Correct mobile menu focus trap`
- `[docs] Update architecture overview`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review performed
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process

1. Automated checks must pass
2. At least one approval required
3. All comments addressed
4. Squash and merge preferred

## Issue Guidelines

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos
- Environment (browser, OS, etc.)

### Feature Requests

Include:
- Problem description
- Proposed solution
- Alternatives considered
- Additional context

### Questions

- Check existing issues/docs first
- Use discussions for general questions
- Be specific and provide context

## Development Tips

### Hot Reloading

```bash
npm run dev
# App will reload on file changes
```

### Debugging

- Use browser DevTools
- Check console for errors
- Use the React DevTools extension

### Keeping content honest

Copy on this site is sourced from the smart-contract and backend repositories' own
documentation. When platform status changes, update `components/sections/ProjectStatus.tsx`
(and `SmartContractLayer.tsx` / `Backend.tsx` as needed) rather than letting the page drift.
Do not add "live" badges or deployment claims that aren't backed by a public deployment.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## Getting Help

- GitHub Issues: Bug reports and features
- GitHub Discussions: Questions and ideas
- Discord: Real-time community help
- Email: dev@fanilab.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make FaniLab better for everyone. We appreciate your time and effort!
