/**
 * Freighter Wallet Integration
 * Production-ready wallet connection and transaction signing
 */

import * as StellarSdk from 'stellar-sdk';
import { getNetworkPassphrase } from './soroban';

export interface FreighterAPI {
  isConnected: () => Promise<boolean>;
  getPublicKey: () => Promise<string>;
  signTransaction: (xdr: string, opts?: { network?: string; accountToSign?: string }) => Promise<string>;
  signAuthEntry: (entryXdr: string, opts?: { accountToSign?: string }) => Promise<string>;
  getNetwork: () => Promise<string>;
  getNetworkDetails: () => Promise<{ network: string; networkPassphrase: string }>;
}

declare global {
  interface Window {
    freighter?: FreighterAPI;
  }
}

/**
 * Check if Freighter wallet extension is installed
 */
export async function isFreighterInstalled(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Wait a bit for extension to load
  let attempts = 0;
  while (attempts < 10) {
    if (window.freighter) return true;
    await new Promise((resolve) => setTimeout(resolve, 100));
    attempts++;
  }

  return !!window.freighter;
}

/**
 * Check if wallet is already connected
 */
export async function isWalletConnected(): Promise<boolean> {
  if (!(await isFreighterInstalled())) return false;

  try {
    return await window.freighter!.isConnected();
  } catch (error) {
    console.error('Failed to check wallet connection:', error);
    return false;
  }
}

/**
 * Connect to Freighter wallet and get public key
 */
export async function connectWallet(): Promise<string> {
  if (!(await isFreighterInstalled())) {
    throw new Error(
      'Freighter wallet is not installed. Please install it from https://freighter.app'
    );
  }

  try {
    const publicKey = await window.freighter!.getPublicKey();

    if (!publicKey) {
      throw new Error('No public key returned from Freighter');
    }

    // Validate public key format
    try {
      StellarSdk.Keypair.fromPublicKey(publicKey);
    } catch (error) {
      throw new Error('Invalid public key format');
    }

    return publicKey;
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error('Connection request declined by user');
    }
    throw error;
  }
}

/**
 * Get current network from Freighter
 */
export async function getFreighterNetwork(): Promise<string> {
  if (!(await isFreighterInstalled())) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    return await window.freighter!.getNetwork();
  } catch (error) {
    console.error('Failed to get network:', error);
    return 'TESTNET';
  }
}

/**
 * Verify wallet is on correct network
 */
export async function verifyNetwork(): Promise<boolean> {
  try {
    const details = await window.freighter!.getNetworkDetails();
    const expectedPassphrase = getNetworkPassphrase();
    return details.networkPassphrase === expectedPassphrase;
  } catch (error) {
    console.error('Failed to verify network:', error);
    return false;
  }
}

/**
 * Sign a transaction with Freighter
 */
export async function signTransactionWithFreighter(
  xdr: string,
  accountToSign?: string
): Promise<string> {
  if (!(await isFreighterInstalled())) {
    throw new Error('Freighter wallet is not installed');
  }

  try {
    const networkPassphrase = getNetworkPassphrase();

    const signedXdr = await window.freighter!.signTransaction(xdr, {
      network: networkPassphrase,
      accountToSign,
    });

    if (!signedXdr) {
      throw new Error('No signed transaction returned from Freighter');
    }

    return signedXdr;
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error('Transaction signing declined by user');
    }
    throw error;
  }
}

/**
 * Request network switch in Freighter
 */
export async function requestNetworkSwitch(network: 'TESTNET' | 'PUBLIC'): Promise<void> {
  const message =
    network === 'TESTNET'
      ? 'Please switch to Stellar Testnet in your Freighter wallet'
      : 'Please switch to Stellar Mainnet in your Freighter wallet';

  throw new Error(message);
}

/**
 * Get account balance
 */
export async function getAccountBalance(publicKey: string): Promise<string> {
  try {
    const { getAccountBalance } = await import('./soroban');
    return await getAccountBalance(publicKey);
  } catch (error) {
    console.error('Failed to get account balance:', error);
    return '0';
  }
}
