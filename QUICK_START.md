# 🚀 FaniLab Frontend - Quick Start

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Freighter wallet extension installed
- [ ] Smart contracts deployed (from SwiftChain-SmartContract repo)

## 3-Step Quick Start

### Step 1: Install & Configure

```bash
# Navigate to frontend directory
cd c:\Users\user\Documents\Projects\fanilab\FaniLab-Frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env.local
```

Edit `.env.local` and add your deployed contract IDs:
```env
NEXT_PUBLIC_ESCROW_CONTRACT_ID=CXXXXXXX...
NEXT_PUBLIC_DELIVERY_CONTRACT_ID=CXXXXXXX...
NEXT_PUBLIC_DISPUTE_CONTRACT_ID=CXXXXXXX...
```

### Step 2: Run Development Server

**Option A: Using npm**
```bash
npm run dev
```

**Option B: Using the batch script (Windows)**
```bash
start-dev.bat
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## First Time Setup

1. **Install Freighter Wallet**
   - Go to https://www.freighter.app/
   - Install the browser extension
   - Create a new wallet or import existing

2. **Switch to Testnet**
   - Open Freighter
   - Click Settings → Network
   - Select "Testnet"

3. **Fund Your Account**
   - Get free test XLM from: https://laboratory.stellar.org/#account-creator
   - Or use Stellar CLI: `stellar keys fund YOUR_ADDRESS --network testnet`

4. **Connect Wallet**
   - Click "Connect Wallet" button in the app
   - Approve the connection in Freighter
   - Your address will appear in the header

## Testing the Platform

### As a Sender (Create Delivery)

1. Click "Create Delivery" in the navigation
2. Fill in the form:
   - Pickup Location: "123 Main St, City A"
   - Delivery Location: "456 Oak Ave, City B"
   - Amount: 10 (XLM)
   - Description: "Small package"
3. Click "Create Delivery & Lock Payment"
4. Approve transaction in Freighter
5. Payment is locked in escrow!

### As a Driver (Accept Delivery)

1. Switch to a different Stellar account (or use another browser)
2. Click "Browse Jobs"
3. Find available deliveries
4. Click "Accept Delivery"
5. Approve transaction in Freighter

### Complete Delivery

1. After delivery is completed
2. Recipient confirms delivery
3. Escrow automatically releases payment to driver
4. View updated balance in dashboard

## Troubleshooting

### "Cannot connect wallet"
- Ensure Freighter is installed and unlocked
- Refresh the page
- Check you're on the correct network (Testnet)

### "Transaction failed"
- Check you have enough XLM for fees (~0.01 XLM)
- Verify contract addresses in .env.local are correct
- Ensure contracts are deployed and initialized

### "Port 3000 is already in use"
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
SwiftChain-Frontend/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Home
│   ├── create-delivery/   # Create delivery form
│   ├── deliveries/        # Browse available jobs
│   └── dashboard/         # User dashboard
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header with wallet
│   └── Footer.tsx        # Site footer
├── lib/                   # Utility functions
│   ├── stellar.ts        # Stellar/Soroban integration
│   ├── contracts.ts      # Smart contract calls
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript definitions
└── public/               # Static assets
```

## Key Features

✅ **Wallet Integration** - Connect via Freighter
✅ **Create Deliveries** - Post delivery requests
✅ **Browse Jobs** - Find available deliveries
✅ **Escrow System** - Secure blockchain payments
✅ **Dashboard** - Track deliveries and earnings
✅ **Responsive Design** - Works on mobile and desktop

## Next Steps

1. ✅ Run the frontend
2. ⬜ Deploy smart contracts (if not done)
3. ⬜ Test full delivery flow
4. ⬜ Customize UI/UX
5. ⬜ Add more features
6. ⬜ Deploy to production

## Useful Links

- **Stellar Testnet Explorer**: https://stellar.expert/explorer/testnet
- **Freighter Wallet**: https://www.freighter.app/
- **Stellar Laboratory**: https://laboratory.stellar.org/
- **Soroban Docs**: https://soroban.stellar.org/docs

## Need Help?

- Review the full README.md
- Check GETTING_STARTED.md for detailed instructions
- See SWIFTCHAIN_PROJECT_OVERVIEW.md for complete architecture
- Review smart contract documentation in SwiftChain-SmartContract repo

---

**Happy Shipping! 📦🚀**
