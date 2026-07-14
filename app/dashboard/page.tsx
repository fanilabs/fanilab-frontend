'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { useUserDeliveries } from '@/lib/hooks/useDeliveries';
import { DeliveryStatus } from '@/types';

export default function DashboardPage() {
  const { address, balance, isConnected } = useWallet();
  const { deliveries, isLoading } = useUserDeliveries(address);

  const stats = {
    active: deliveries.filter(
      (d) =>
        d.status === DeliveryStatus.ACCEPTED ||
        d.status === DeliveryStatus.IN_TRANSIT ||
        d.status === DeliveryStatus.DELIVERED
    ).length,
    completed: deliveries.filter((d) => d.status === DeliveryStatus.COMPLETED).length,
    totalEarnings: deliveries
      .filter((d) => d.status === DeliveryStatus.COMPLETED && d.driver === address)
      .reduce((sum, d) => sum + d.amount, 0),
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-8 text-4xl font-bold text-primary-600">Dashboard</h1>
          <div className="rounded-lg bg-white p-8 shadow-md">
            <p className="text-xl text-gray-600">Please connect your wallet to view your dashboard</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-primary-600">My Dashboard 📊</h1>

        {/* Wallet Info */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Wallet Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="break-all font-mono text-sm text-gray-900">{address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-2xl font-bold text-primary-600">{parseFloat(balance).toFixed(2)} XLM</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Active Deliveries</h3>
            <p className="text-4xl font-bold text-primary-600">{stats.active}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Completed Deliveries</h3>
            <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Total Earnings</h3>
            <p className="text-4xl font-bold text-primary-600">{stats.totalEarnings.toFixed(2)} XLM</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading...</p>
          ) : deliveries.length === 0 ? (
            <p className="text-gray-600">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {deliveries.slice(0, 5).map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {delivery.pickupLocation} → {delivery.deliveryLocation}
                    </p>
                    <p className="text-sm text-gray-600">
                      {delivery.sender === address ? 'Sender' : 'Driver'} • {delivery.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">{delivery.amount} XLM</p>
                    <p className="text-xs text-gray-500">
                      {new Date(Number(delivery.createdAt) * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
