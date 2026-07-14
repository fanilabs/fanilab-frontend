# Getting Started with FaniLab Frontend

## Prerequisites

Before you begin, make sure you have:

1. **Node.js 18+** installed
   ```bash
   node --version  # Should be 18.0.0 or higher
   ```

2. **npm or yarn** package manager
   ```bash
   npm --version
   # or
   yarn --version
   ```

3. **Freighter Wallet** (Stellar wallet browser extension)
   - Download from: https://www.freighter.app/
   - Create a new wallet or import existing one
   - Switch to Testnet for development

## Installation Steps

### 1. Navigate to the Frontend Directory

```bash
cd c:\Users\user\Documents\Projects\fanilab\FaniLab-Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including:
- Next.js
- React
- TypeScript
- TailwindCSS
- Stellar SDK
- Freighter API

### 3. Configure Environment Variables

Copy the example environment file:

```bash
copy .env.example .env.local
```

Edit `.env.local` and update with your values:

```env
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Smart Contract Addresses (Update after deploying contracts)
NEXT_PUBLIC_ESCROW_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_DELIVERY_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_DISPUTE_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Deploy Smart Contracts First

Before running the frontend, you need to deploy the smart contracts:

1. Navigate to the smart contract directory:
   ```bash
   cd ..\SwiftChain-SmartContract
   ```

2. Follow the deployment instructions in that repository's README

3. Copy the deployed contract IDs and update your `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start at: **http://localhost:3000**

### 6. Connect Your Wallet

1. Open http://localhost:3000 in your browser
2. Click "Connect Wallet" in the top-right corner
3. Approve the connection in Freighter
4. Your wallet address will appear in the header

## Project Features

### For Senders (Package Owners)
- **Create Delivery**: Post a delivery request with pickup/delivery locations
- **Lock Payment**: Secure payment in blockchain escrow
- **Track Status**: Monitor delivery progress in real-time

### For Drivers (Transport Providers)
- **Browse Jobs**: View available delivery opportunities
- **Accept Deliveries**: Claim delivery jobs and start earning
- **Instant Settlement**: Receive payment immediately upon delivery confirmation

### Dashboard
- View active and completed deliveries
- Track earnings
- Monitor reputation score

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

### Wallet Connection Issues

If you can't connect your wallet:
1. Make sure Freighter extension is installed and unlocked
2. Check that you're on the correct network (Testnet)
3. Clear browser cache and reload

### Contract Interaction Errors

If transactions fail:
1. Verify contract addresses in `.env.local` are correct
2. Ensure you have XLM in your wallet for fees
3. Check that contracts are properly deployed and initialized

### Build Errors

If you encounter build errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

## Next Steps

1. **Test the Flow**: Create a test delivery and complete the full workflow
2. **Explore the Code**: Check out the `/lib` folder for blockchain integration
3. **Customize**: Modify components in `/components` and pages in `/app`
4. **Deploy**: Build and deploy to Vercel, Netlify, or your hosting service

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://www.freighter.app/)
- [TailwindCSS](https://tailwindcss.com/docs)

## Support

For issues or questions:
- Check the main README.md
- Review the smart contract documentation
- Open an issue on GitHub
