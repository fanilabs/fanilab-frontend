'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { acceptDelivery } from '@/lib/contracts';
import { useWallet } from '@/lib/hooks/useWallet';
import { useDeliveries } from '@/lib/hooks/useDeliveries';
import { getUserErrorMessage, logError } from '@/lib/errors';
import { DeliveryStatus } from '@/types';

export default function DeliveriesPage() {
  const { address, isConnected } = useWallet();
  const { deliveries, isLoading, refresh } = useDeliveries();
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const handleAccept = async (deliveryId: string) => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setAcceptingId(deliveryId);
    const toastId = toast.loading('Accepting delivery...');

    try {
      await acceptDelivery({
        deliveryId,
        driverAddress: address,
      });

      toast.success('Delivery accepted successfully!', { id: toastId });
      refresh(); // Refresh deliveries list
    } catch (error) {
      const errorMessage = getUserErrorMessage(error);
      toast.error(errorMessage, { id: toastId });
      logError(error, 'Accept Delivery');
    } finally {
      setAcceptingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      [DeliveryStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [DeliveryStatus.ACCEPTED]: 'bg-blue-100 text-blue-800',
      [DeliveryStatus.IN_TRANSIT]: 'bg-purple-100 text-purple-800',
      [DeliveryStatus.DELIVERED]: 'bg-green-100 text-green-800',
      [DeliveryStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
      [DeliveryStatus.CANCELLED]: 'bg-red-100 text-red-800',
      [DeliveryStatus.DISPUTED]: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-pulse">
            <div className="mb-8 h-10 w-64 rounded bg-gray-300"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-lg bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary-600">Available Deliveries 🚚</h1>
          <button
            onClick={() => refresh()}
            className="rounded-md bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200"
          >
            Refresh
          </button>
        </div>

        {deliveries.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-md">
            <p className="text-xl text-gray-600">No deliveries available at the moment</p>
            <p className="mt-2 text-sm text-gray-500">
              Check back later or create your own delivery request
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(delivery.status)}`}
                  >
                    {delivery.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-sm text-gray-600">From:</p>
                  <p className="font-semibold">{delivery.pickupLocation}</p>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-sm text-gray-600">To:</p>
                  <p className="font-semibold">{delivery.deliveryLocation}</p>
                </div>

                {delivery.description && (
                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Description:</p>
                    <p className="text-sm text-gray-700">{delivery.description}</p>
                  </div>
                )}

                <div className="mb-4">
                  <p className="mb-1 text-sm text-gray-600">Payment:</p>
                  <p className="text-2xl font-bold text-primary-600">{delivery.amount} XLM</p>
                </div>

                {delivery.status === DeliveryStatus.PENDING && (
                  <button
                    onClick={() => handleAccept(delivery.id)}
                    disabled={acceptingId === delivery.id || !isConnected}
                    className="w-full rounded-md bg-primary-600 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {acceptingId === delivery.id ? 'Accepting...' : 'Accept Delivery'}
                  </button>
                )}

                {delivery.status !== DeliveryStatus.PENDING && delivery.driver === address && (
                  <div className="rounded-md bg-green-50 p-3 text-center">
                    <p className="text-sm font-medium text-green-800">Your Active Delivery</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
