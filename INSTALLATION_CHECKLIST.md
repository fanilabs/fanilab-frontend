# SwiftChain Frontend - Installation Checklist ✅

## Pre-Installation Requirements

### System Requirements
- [ ] Windows 10/11
- [ ] 4GB+ RAM available
- [ ] 500MB+ disk space

### Software Requirements
- [ ] **Node.js 18+** installed
  ```bash
  node --version  # Should show v18.0.0 or higher
  ```
  Download: https://nodejs.org/

- [ ] **npm** installed (comes with Node.js)
  ```bash
  npm --version  # Should show 9.0.0 or higher
  ```

- [ ] **Git** installed (optional, for version control)
  ```bash
  git --version
  ```

### Browser Requirements
- [ ] Modern browser (Chrome, Firefox, Edge, or Brave)
- [ ] **Freighter Wallet Extension** installed
  - Chrome: https://chrome.google.com/webstore
  - Firefox: https://addons.mozilla.org
  - Direct: https://www.freighter.app/

---

## Installation Steps

### Step 1: Verify Prerequisites ✓

Open Command Prompt or PowerShell and run:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

If either command fails, install Node.js first.

---

### Step 2: Navigate to Frontend Directory 📁

```bash
cd c:\Users\user\Documents\Projects\fanilab\SwiftChain-Frontend
```

---

### Step 3: Install Dependencies 📦

```bash
npm install
```

**Expected output:**
```
added 234 packages in 45s
```

**Troubleshooting:**
- If it fails, try: `npm install --legacy-peer-deps`
- If still failing, delete `node_modules` and `package-lock.json`, then retry

---

### Step 4: Configure Environment ⚙️

#### 4.1 Create Environment File

```bash
copy .env.example .env.local
```

#### 4.2 Edit .env.local

Open `.env.local` in a text editor and update:

```env
# Stellar Network (keep as testnet for development)
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# ADD YOUR CONTRACT IDs HERE (from smart contract deployment)
NEXT_PUBLIC_ESCROW_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_DELIVERY_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_DISPUTE_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Backend API (optional, for future use)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Important:** Replace the `CXXXXX...` with your actual deployed contract addresses!

---

### Step 5: Deploy Smart Contracts (If Not Done) 🔐

**If you haven't deployed the smart contracts yet:**

```bash
# Navigate to smart contract directory
cd ..\SwiftChain-SmartContract

# Build contracts
cargo build --target wasm32-unknown-unknown --release

# Generate deployer key
stellar keys generate deployer

# Fund with test XLM
stellar keys fund deployer --network testnet

# Deploy escrow contract
.\scripts\deploy-contract.sh escrow_contract

# Deploy delivery contract
.\scripts\deploy-contract.sh delivery_contract

# Save the contract IDs that are printed!
```

Then go back to Step 4.2 and add the contract IDs to `.env.local`.

---

### Step 6: Setup Freighter Wallet 👛

#### 6.1 Install Extension
- Go to https://www.freighter.app/
- Click "Install for Chrome/Firefox"
- Pin the extension to your browser toolbar

#### 6.2 Create Wallet
- Open Freighter extension
- Click "Create new wallet"
- **Save your recovery phrase securely!**
- Set a password

#### 6.3 Switch to Testnet
- Open Freighter
- Click the network dropdown (top right)
- Select "Testnet"

#### 6.4 Fund Your Account
- Copy your public key from Freighter
- Visit: https://laboratory.stellar.org/#account-creator?network=test
- Paste your public key and click "Create Account"
- Your account will receive 10,000 test XLM

---

### Step 7: Run the Frontend 🚀

#### Option A: Using npm

```bash
npm run dev
```

#### Option B: Using batch script (Windows)

```bash
start-dev.bat
```

**Expected output:**
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.3s
```

---

### Step 8: Test the Application 🧪

#### 8.1 Open Browser
Navigate to: **http://localhost:3000**

#### 8.2 Connect Wallet
- Click "Connect Wallet" button (top right)
- Approve connection in Freighter popup
- Your address should appear in the header

#### 8.3 Test Navigation
- [ ] Home page loads correctly
- [ ] Click "Create Delivery" - form appears
- [ ] Click "Browse Jobs" - deliveries page loads
- [ ] Click "Dashboard" - dashboard appears

#### 8.4 Create Test Delivery
1. Go to "Create Delivery"
2. Fill in the form:
   - Pickup: "123 Test St, City A"
   - Delivery: "456 Test Ave, City B"
   - Amount: 10
   - Description: "Test package"
3. Click "Create Delivery & Lock Payment"
4. Approve transaction in Freighter
5. Check for success message

---

## Verification Checklist ✅

### Installation Complete When:
- [ ] `npm install` completed without errors
- [ ] `.env.local` file created and configured
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads in browser
- [ ] All pages navigate correctly
- [ ] Freighter wallet installed and funded
- [ ] Wallet connects to the app
- [ ] Can view account address in header

---

## Common Issues & Solutions 🔧

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Port 3000 already in use"
**Solutions:**
```bash
# Option 1: Kill the process
npx kill-port 3000

# Option 2: Use different port
npm run dev -- -p 3001
```

### Issue: "Cannot connect wallet"
**Solutions:**
- Ensure Freighter is installed
- Check Freighter is unlocked
- Verify you're on Testnet in Freighter
- Refresh the page
- Try in incognito mode

### Issue: "Transaction failed"
**Solutions:**
- Check you have XLM for fees (~0.01 XLM)
- Verify contract IDs in `.env.local` are correct
- Ensure contracts are deployed and initialized
- Check Freighter is on the correct network

### Issue: "Module not found" errors
**Solution:**
```bash
# Clean reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Build errors
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## Development Commands Reference 📝

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Kill port 3000
npx kill-port 3000
```

---

## Next Steps After Installation 🎯

1. **Read the documentation:**
   - [ ] Review README.md for overview
   - [ ] Check QUICK_START.md for usage guide
   - [ ] Read GETTING_STARTED.md for details

2. **Test the platform:**
   - [ ] Create a test delivery
   - [ ] Browse deliveries with another account
   - [ ] Complete a full delivery workflow

3. **Customize:**
   - [ ] Modify components in `/components`
   - [ ] Update styling in Tailwind config
   - [ ] Add new features in `/app`

4. **Deploy:**
   - [ ] Build for production
   - [ ] Deploy to Vercel/Netlify
   - [ ] Configure production environment

---

## Support Resources 📚

- **Documentation:**
  - README.md
  - QUICK_START.md
  - GETTING_STARTED.md
  - ../SWIFTCHAIN_PROJECT_OVERVIEW.md

- **External Resources:**
  - Stellar: https://developers.stellar.org/
  - Soroban: https://soroban.stellar.org/docs
  - Next.js: https://nextjs.org/docs
  - Freighter: https://www.freighter.app/docs

---

## Installation Complete! 🎉

You're ready to start building with SwiftChain!

**Happy Coding! 🚀📦**
