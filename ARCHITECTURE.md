# FaniLab Frontend Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Next.js 14 Application                      │   │
│  │                  (App Router)                           │   │
│  │                                                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  Pages   │  │Components│  │  Hooks   │            │   │
│  │  │ (Routes) │  │   (UI)   │  │ (Logic)  │            │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘            │   │
│  │       │             │             │                    │   │
│  │       └─────────────┴─────────────┘                    │   │
│  │                     │                                  │   │
│  │       ┌─────────────┴─────────────┐                   │   │
│  │       │                           │                   │   │
│  │  ┌────▼────┐              ┌───────▼──────┐           │   │
│  │  │ Zustand │              │   SWR Cache  │           │   │
│  │  │  Store  │              │  (Data Fetch)│           │   │
│  │  └────┬────┘              └───────┬──────┘           │   │
│  │       │                           │                   │   │
│  │       └──────────┬────────────────┘                   │   │
│  │                  │                                    │   │
│  │       ┌──────────▼──────────┐                        │   │
│  │       │   Contract API      │                        │   │
│  │       │   (lib/contracts)   │                        │   │
│  │       └──────────┬──────────┘                        │   │
│  │                  │                                    │   │
│  └──────────────────┼────────────────────────────────────┘   │
│                     │                                         │
└─────────────────────┼─────────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
    ┌─────▼──────┐        ┌──────▼─────┐
    │  Freighter │        │  Soroban   │
    │   Wallet   │        │    RPC     │
    │ (Signing)  │        │  Server    │
    └────────────┘        └──────┬─────┘
                                 │
                          ┌──────▼─────┐
                          │  Stellar   │
                          │ Blockchain │
                          │            │
                          │  Contracts │
                          │  - Escrow  │
                          │  -Delivery │
                          │  -Dispute  │
                          └────────────┘
```

## 📦 Layer Architecture

### 1. Presentation Layer (React Components)

```
app/
├── layout.tsx                  # Root layout with providers
├── page.tsx                    # Home page
├── create-delivery/
│   └── page.tsx               # Create delivery form
├── deliveries/
│   └── page.tsx               # Browse deliveries
└── dashboard/
    └── page.tsx               # User dashboard

components/
├── Header.tsx                 # Navigation header
├── Footer.tsx                 # Page footer
└── Toaster.tsx               # Toast notifications
```

**Responsibilities:**
- Render UI components
- Handle user interactions
- Display data from hooks
- Form validation feedback

### 2. Business Logic Layer (Hooks & Stores)

```
lib/
├── hooks/
│   ├── useWallet.ts          # Wallet operations
│   └── useDeliveries.ts      # Delivery data fetching
│
└── store/
    ├── wallet-store.ts       # Wallet state (Zustand)
    └── delivery-store.ts     # Delivery state (Zustand)
```

**Responsibilities:**
- State management
- Data caching (SWR)
- Business rules
- Side effects

### 3. Integration Layer (API & Contracts)

```
lib/
├── contracts.ts              # High-level contract API
├── stellar.ts                # Wallet integration
│
└── soroban/
    ├── index.ts             # Core Soroban utilities
    └── contracts/
        ├── escrow.ts        # Escrow contract
        └── delivery.ts      # Delivery contract
```

**Responsibilities:**
- Blockchain communication
- Transaction building
- Contract invocation
- Result parsing

### 4. Validation Layer

```
lib/
├── validations/
│   └── delivery.ts          # Zod schemas
│
└── errors/
    └── index.ts            # Error handling
```

**Responsibilities:**
- Input validation
- Error parsing
- Type safety
- User-friendly errors

## 🔄 Data Flow

### Creating a Delivery

```
1. User fills form
   ↓
2. React Hook Form validates (Zod)
   ↓
3. Submit handler calls createDelivery()
   ↓
4. contracts.ts builds transaction
   ↓
5. soroban/contracts/delivery.ts prepares contract call
   ↓
6. soroban/index.ts simulates transaction
   ↓
7. stellar.ts signs with Freighter
   ↓
8. soroban/index.ts submits to blockchain
   ↓
9. Poll for transaction completion
   ↓
10. Update UI with result
    ↓
11. SWR revalidates data
    ↓
12. Zustand store updated
    ↓
13. Components re-render
```

## 🔐 Security Architecture

### Defense in Depth

```
Layer 1: Browser Security
├── HTTPS only
├── Security headers
├── CSP policy
└── XSS protection

Layer 2: Input Validation
├── Zod schemas
├── Type checking
├── Sanitization
└── Format validation

Layer 3: Wallet Security
├── No key storage
├── Freighter signing
├── Network validation
└── Transaction simulation

Layer 4: Blockchain Security
├── Smart contracts
├── Escrow protection
├── Access control
└── State validation

Layer 5: Monitoring
├── Error tracking
├── Anomaly detection
├── Audit logs
└── Alerts
```

## 🎯 State Management Strategy

### Zustand Stores (Global State)

```typescript
useWalletStore
├── address          // User's Stellar address
├── balance          // XLM balance
├── isConnected      // Connection status
└── actions
    ├── connect()
    ├── disconnect()
    └── refreshBalance()

useDeliveryStore
├── deliveries       // All deliveries
├── userDeliveries   // User's deliveries
├── activeDelivery   // Current delivery
└── actions
    ├── setDeliveries()
    ├── updateDelivery()
    └── removeDelivery()
```

### SWR Cache (Server State)

```typescript
useDeliveries()
├── data             // Cached delivery list
├── isLoading        // Loading state
├── error            // Error state
└── mutate()         // Revalidate function

useUserDeliveries(address)
├── data             // User's deliveries
├── isLoading        // Loading state
├── error            // Error state
└── mutate()         // Revalidate function
```

### Local Component State

```typescript
- Form inputs (React Hook Form)
- UI state (modals, dropdowns)
- Temporary data (filters, sorting)
- Loading indicators
```

## 🧪 Testing Architecture

### Test Pyramid

```
           ┌─────────────┐
          /   E2E Tests   \     ← Playwright
         /   (Few tests)   \      (Critical paths)
        └──────────────────┘
       ┌────────────────────┐
      /  Integration Tests  \   ← Vitest + RTL
     /  (Some tests)         \    (Components + Hooks)
    └────────────────────────┘
   ┌──────────────────────────┐
  /      Unit Tests            \  ← Vitest
 /      (Many tests)            \   (Utils, Logic)
└────────────────────────────────┘
```

### Test Coverage

```
lib/
├── soroban/         ✅ Unit tests
├── store/           ✅ Unit tests
├── hooks/           ✅ Integration tests
├── validations/     ✅ Unit tests
└── errors/          ✅ Unit tests

components/          ✅ Integration tests

app/                 ✅ E2E tests
```

## 🚀 Build & Deploy Pipeline

```
┌─────────────────┐
│   Git Push      │
└────────┬────────┘
         │
    ┌────▼────┐
    │ GitHub  │
    └────┬────┘
         │
    ┌────▼──────────────────┐
    │   GitHub Actions      │
    │   CI/CD Pipeline      │
    ├───────────────────────┤
    │ 1. Install deps       │
    │ 2. Lint & Type check  │
    │ 3. Run tests          │
    │ 4. Build application  │
    │ 5. Security scan      │
    └────┬──────────────────┘
         │
    ┌────▼────────┐
    │   Deploy    │
    ├─────────────┤
    │  Vercel     │
    │  or Docker  │
    │  or Custom  │
    └────┬────────┘
         │
    ┌────▼────────┐
    │ Production  │
    │   (Live)    │
    └─────────────┘
```

## 📊 Performance Strategy

### Optimization Techniques

1. **Code Splitting**
   - Dynamic imports for routes
   - Component lazy loading
   - Vendor bundle separation

2. **Caching**
   - SWR for API data
   - Browser caching headers
   - CDN for static assets

3. **Minimization**
   - Next.js automatic minification
   - Tree shaking
   - Dead code elimination

4. **Image Optimization**
   - Next.js Image component
   - WebP/AVIF formats
   - Responsive images

## 🔌 External Integrations

```
FaniLab Frontend
├── Freighter Wallet
│   └── Transaction signing
│
├── Soroban RPC
│   ├── Transaction submission
│   ├── State queries
│   └── Event streaming
│
├── Backend API (Optional)
│   ├── Delivery indexing
│   ├── Search functionality
│   └── Analytics
│
└── Third-party Services
    ├── Error tracking (Sentry)
    ├── Analytics (Vercel)
    └── Monitoring (UptimeRobot)
```

## 🎨 Design Patterns Used

### Architectural Patterns
- **Component-Based Architecture** - React components
- **Store Pattern** - Zustand for state
- **Repository Pattern** - Contract abstraction
- **Factory Pattern** - Transaction builders
- **Observer Pattern** - SWR data fetching

### React Patterns
- **Custom Hooks** - Reusable logic
- **Compound Components** - Complex UI
- **Render Props** - Flexible rendering
- **Higher-Order Components** - Behavior sharing
- **Context + Hooks** - State distribution

### Code Patterns
- **Error Boundaries** - Error containment
- **Suspense** - Async rendering
- **Memoization** - Performance optimization
- **Debouncing** - Input optimization
- **Throttling** - Event optimization

## 📐 Scalability Considerations

### Horizontal Scaling
- Stateless architecture
- CDN distribution
- Load balancing ready
- Multiple instance support

### Vertical Scaling
- Code splitting
- Lazy loading
- Efficient re-renders
- Optimized bundle size

### Database Scaling
- SWR caching layer
- Pagination support
- Infinite scroll ready
- Batch operations

## 🔄 Update Strategy

### Dependency Updates
```bash
# Check outdated packages
npm outdated

# Update with caution
npm update

# Test after updates
npm run test
npm run type-check
npm run build
```

### Version Control
- Semantic versioning
- Changelog maintenance
- Git tags for releases
- Branch protection rules

---

## 🎯 Key Takeaways

1. **Layered Architecture** - Clear separation of concerns
2. **Type Safety** - TypeScript throughout
3. **State Management** - Zustand + SWR combination
4. **Security First** - Defense in depth
5. **Performance** - Optimized for speed
6. **Testability** - Comprehensive test coverage
7. **Maintainability** - Clean, documented code
8. **Scalability** - Ready to grow

---

**This architecture supports a production-ready, enterprise-grade blockchain application on Stellar.**
