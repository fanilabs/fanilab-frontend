# FaniLab Frontend 🚀

> Production-ready Next.js frontend for blockchain-powered logistics platform on Stellar

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple.svg)](https://stellar.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## 📋 Overview

FaniLab is a decentralized logistics platform that connects senders with delivery drivers using blockchain technology for trustless escrow and transparent delivery tracking.

### Key Features

- 🔐 **Secure Escrow**: Smart contract-based payment protection
- 📦 **Real-time Tracking**: Monitor delivery status on blockchain
- 💰 **Instant Settlement**: Automatic payment release upon completion
- 🌐 **Decentralized**: No central authority or intermediaries
- 🔍 **Transparent**: All transactions verifiable on Stellar blockchain

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         ├─── Freighter Wallet (User Auth)
         │
         ├─── Soroban RPC (Blockchain)
         │    └── Smart Contracts
         │        ├── Escrow
         │        ├── Delivery
         │        └── Dispute
         │
         └─── API Server (Indexer)
              └── Database
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Freighter Wallet** ([Install](https://freighter.app/))
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/fanilab-frontend.git
cd fanilab-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your contract addresses in .env.local
# NEXT_PUBLIC_ESCROW_CONTRACT_ID=C...
# NEXT_PUBLIC_DELIVERY_CONTRACT_ID=C...
# NEXT_PUBLIC_DISPUTE_CONTRACT_ID=C...

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fanilab-frontend/
├── app/                        # Next.js App Router
│   ├── create-delivery/       # Create delivery page
│   ├── deliveries/            # Browse deliveries
│   ├── dashboard/             # User dashboard
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/                 # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Toaster.tsx
├── lib/                       # Business logic
│   ├── soroban/              # Stellar/Soroban SDK
│   │   ├── index.ts          # Core utilities
│   │   └── contracts/        # Contract integrations
│   │       ├── escrow.ts
│   │       └── delivery.ts
│   ├── store/                # State management (Zustand)
│   │   ├── wallet-store.ts
│   │   └── delivery-store.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── useWallet.ts
│   │   └── useDeliveries.ts
│   ├── validations/          # Zod schemas
│   ├── errors/               # Error handling
│   ├── stellar.ts            # Wallet integration
│   ├── contracts.ts          # High-level API
│   └── utils.ts
├── types/                     # TypeScript definitions
├── __tests__/                 # Unit tests (Vitest)
├── e2e/                       # E2E tests (Playwright)
├── public/                    # Static assets
└── [config files]
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STELLAR_NETWORK` | Network to use | `testnet` or `mainnet` |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | Soroban RPC endpoint | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_NETWORK_PASSPHRASE` | Network passphrase | `Test SDF Network ; September 2015` |
| `NEXT_PUBLIC_ESCROW_CONTRACT_ID` | Escrow contract address | `C...` |
| `NEXT_PUBLIC_DELIVERY_CONTRACT_ID` | Delivery contract address | `C...` |
| `NEXT_PUBLIC_DISPUTE_CONTRACT_ID` | Dispute contract address | `C...` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

### Network Configuration

**Testnet (Development)**
```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

**Mainnet (Production)**
```env
NEXT_PUBLIC_STELLAR_NETWORK=mainnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Public Global Stellar Network ; September 2015
```

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run all tests
npm run test

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run in headed mode
npx playwright test --headed

# Run specific test
npx playwright test e2e/home.spec.ts
```

### Type Checking

```bash
npm run type-check
```

## 🎨 Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Pre-commit Hooks

Git hooks automatically run linting and formatting on commit using Husky and lint-staged.

## 📦 Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start

# Analyze bundle size
npm run build -- --analyze
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/fanilab-frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t fanilab-frontend .

# Run container
docker run -p 3000:3000 --env-file .env.production fanilab-frontend
```

### Other Platforms

See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for detailed deployment instructions.

## 🔗 Integration with Smart Contracts

### Contract Deployment

1. Deploy smart contracts from `FaniLab-SmartContract` repository
2. Note contract IDs
3. Update `.env.local` with contract addresses
4. Verify contracts on Stellar Expert

### Transaction Flow

```typescript
// 1. Create delivery with escrow
const { deliveryId, escrowId } = await createDelivery({
  sender: address,
  amount: 10.5,
  pickupLocation: "123 Main St",
  deliveryLocation: "456 Oak Ave"
});

// 2. Driver accepts delivery
await acceptDelivery({
  deliveryId,
  driverAddress: driverAddress
});

// 3. Recipient confirms delivery (releases payment)
await confirmDelivery({
  deliveryId,
  recipientAddress: address,
  escrowId
});
```

## 📚 API Reference

### Wallet Operations

```typescript
import { useWallet } from '@/lib/hooks/useWallet';

const { 
  address,          // User's Stellar address
  balance,          // XLM balance
  isConnected,      // Connection status
  connect,          // Connect wallet
  disconnect,       // Disconnect wallet
  refreshBalance    // Refresh balance
} = useWallet();
```

### Delivery Operations

```typescript
import { createDelivery, acceptDelivery } from '@/lib/contracts';

// Create delivery
const result = await createDelivery({
  sender: 'G...',
  amount: 10.5,
  pickupLocation: 'Location A',
  deliveryLocation: 'Location B',
  description: 'Package details'
});

// Accept delivery
await acceptDelivery({
  deliveryId: 'delivery-id',
  driverAddress: 'G...'
});
```

See [API.md](./docs/API.md) for complete API documentation.

## 🛠️ Development Tools

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3
- **State**: Zustand + SWR
- **Validation**: Zod
- **Forms**: React Hook Form
- **Testing**: Vitest + Playwright
- **Blockchain**: Stellar SDK 11
- **Wallet**: Freighter API

## 📖 Documentation

- [Production Setup](./PRODUCTION_SETUP.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Quick Start Guide](./QUICK_START.md)
- [Getting Started](./GETTING_STARTED.md)

## 🐛 Troubleshooting

### Common Issues

**Wallet not connecting?**
- Ensure Freighter extension is installed
- Check you're on the correct network (testnet/mainnet)
- Refresh the page

**Transaction failing?**
- Verify contract addresses are correct
- Ensure sufficient XLM balance (including fees)
- Check network connectivity

**Build errors?**
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (requires 18+)

See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for more help.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Contributors

Thanks to all contributors! 🎉

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🔗 Related Repositories

- [FaniLab-SmartContract](../FaniLab-SmartContract) - Soroban smart contracts
- [FaniLab-Backend](../FaniLab-Backend) - Node.js API server and indexer

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/fanilab-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/fanilab-frontend/discussions)
- **Email**: support@fanilab.com
- **Discord**: [Join our Discord](https://discord.gg/fanilab)

## 🌟 Stellar Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/)
- [Stellar Discord](https://discord.gg/stellar)
- [Stellar Stack Exchange](https://stellar.stackexchange.com/)

## 🙏 Acknowledgments

- Stellar Development Foundation
- Freighter Wallet Team
- Next.js Team
- Open source community

---

**Built with ❤️ for the Stellar ecosystem**
