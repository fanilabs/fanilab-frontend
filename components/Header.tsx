'use client';

import Link from 'next/link';
import { useWallet } from '@/lib/hooks/useWallet';
import toast from 'react-hot-toast';
import { getUserErrorMessage, logError } from '@/lib/errors';

export default function Header() {
  const { address, balance, isConnected, isConnecting, connect, disconnect, shortAddress } =
    useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      const errorMessage = getUserErrorMessage(error);
      toast.error(errorMessage);
      logError(error, 'Wallet Connection');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">FaniLab 📦</span>
            </Link>
            <div className="ml-10 flex space-x-8">
              <Link
                href="/create-delivery"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Create Delivery
              </Link>
              <Link
                href="/deliveries"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Browse Jobs
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Balance</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {parseFloat(balance).toFixed(2)} XLM
                  </div>
                </div>
                <div className="rounded-lg bg-primary-50 px-3 py-2">
                  <span className="text-sm font-medium text-primary-700">{shortAddress}</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
