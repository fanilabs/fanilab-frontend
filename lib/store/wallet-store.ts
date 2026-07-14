/**
 * Wallet State Management with Zustand
 * Centralized wallet connection state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { connectWallet, isFreighterInstalled, verifyNetwork, getAccountBalance } from '../stellar';

export interface WalletState {
  // State
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      // Initial state
      address: null,
      balance: '0',
      isConnected: false,
      isConnecting: false,
      error: null,

      // Connect wallet
      connect: async () => {
        set({ isConnecting: true, error: null });

        try {
          // Check if Freighter is installed
          const installed = await isFreighterInstalled();
          if (!installed) {
            throw new Error(
              'Freighter wallet not found. Please install from https://freighter.app'
            );
          }

          // Connect and get public key
          const publicKey = await connectWallet();

          // Verify network
          const correctNetwork = await verifyNetwork();
          if (!correctNetwork) {
            throw new Error(
              'Please switch to the correct network in your Freighter wallet (Testnet)'
            );
          }

          // Get balance
          const balance = await getAccountBalance(publicKey);

          set({
            address: publicKey,
            balance,
            isConnected: true,
            isConnecting: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error.message || 'Failed to connect wallet';
          set({
            address: null,
            balance: '0',
            isConnected: false,
            isConnecting: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      // Disconnect wallet
      disconnect: () => {
        set({
          address: null,
          balance: '0',
          isConnected: false,
          isConnecting: false,
          error: null,
        });
      },

      // Refresh balance
      refreshBalance: async () => {
        const { address } = get();
        if (!address) return;

        try {
          const balance = await getAccountBalance(address);
          set({ balance });
        } catch (error) {
          console.error('Failed to refresh balance:', error);
        }
      },

      // Set error
      setError: (error: string | null) => {
        set({ error });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'fanilab-wallet',
      partialize: (state) => ({
        address: state.address,
        isConnected: state.isConnected,
      }),
    }
  )
);
