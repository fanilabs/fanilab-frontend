/**
 * Custom hook for wallet operations
 * Simplifies wallet interaction in components
 */

import { useWalletStore } from '../store/wallet-store';
import { useEffect } from 'react';

export function useWallet() {
  const {
    address,
    balance,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshBalance,
    clearError,
  } = useWalletStore();

  // Auto-refresh balance every 30 seconds when connected
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, 30000);

    return () => clearInterval(interval);
  }, [isConnected, refreshBalance]);

  return {
    address,
    balance,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshBalance,
    clearError,
    shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null,
  };
}
