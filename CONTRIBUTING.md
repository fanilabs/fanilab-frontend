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

- Node.js 18+
- npm or yarn
- Git
- Freighter wallet (for testing)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/your-org/fanilab-frontend.git
cd fanilab-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Project Structure

```
fanilab-frontend/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/              # Utilities and business logic
│   ├── soroban/     # Stellar/Soroban integration
│   ├── store/       # State management (Zustand)
│   ├── hooks/       # Custom React hooks
│   └── validations/ # Zod schemas
├── types/           # TypeScript type definitions
├── __tests__/       # Unit tests
├── e2e/             # End-to-end tests
└── public/          # Static assets
```

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
interface DeliveryParams {
  sender: string;
  amount: number;
  location: string;
}

function createDelivery(params: DeliveryParams): Promise<string> {
  // ...
}

// Bad
function createDelivery(params: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components focused and single-purpose
- Use prop destructuring

```typescript
// Good
export default function DeliveryCard({ delivery }: { delivery: Delivery }) {
  const { isLoading } = useDelivery(delivery.id);
  // ...
}
```

### State Management

- Use Zustand stores for global state
- Use local state for component-specific data
- Use SWR for server data fetching

### Error Handling

- Use the centralized error handling system
- Parse errors with `parseError()`
- Show user-friendly messages
- Log errors for debugging

```typescript
try {
  await createDelivery(params);
} catch (error) {
  const errorMessage = getUserErrorMessage(error);
  toast.error(errorMessage);
  logError(error, 'Create Delivery');
}
```

### File Naming

- Components: PascalCase (`DeliveryCard.tsx`)
- Utilities: camelCase (`formatAmount.ts`)
- Hooks: camelCase starting with 'use' (`useWallet.ts`)
- Types: PascalCase (`index.ts` with exported types)

## Testing

### Unit Tests

```typescript
// __tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatAmount } from '@/lib/utils';

describe('formatAmount', () => {
  it('should format XLM amount correctly', () => {
    expect(formatAmount(1.5)).toBe('1.50 XLM');
  });
});
```

### Integration Tests

Test component interactions and state updates.

### E2E Tests

```typescript
// e2e/create-delivery.spec.ts
import { test, expect } from '@playwright/test';

test('should create delivery successfully', async ({ page }) => {
  // Test implementation
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
- `[feat] Add delivery filtering`
- `[fix] Resolve wallet connection issue`
- `[docs] Update API documentation`

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
- Use React DevTools extension
- Enable verbose logging in dev

### Working with Stellar

- Use testnet for development
- Get test XLM from friendbot
- Test transactions thoroughly
- Validate all addresses

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stellar Documentation](https://developers.stellar.org)
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
