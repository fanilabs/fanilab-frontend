'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createDelivery } from '@/lib/contracts';
import { useWallet } from '@/lib/hooks/useWallet';
import { createDeliverySchema, CreateDeliveryFormData } from '@/lib/validations/delivery';
import { getUserErrorMessage, logError } from '@/lib/errors';

export default function CreateDeliveryPage() {
  const router = useRouter();
  const { address, isConnected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDeliveryFormData>({
    resolver: zodResolver(createDeliverySchema),
  });

  const onSubmit = async (data: CreateDeliveryFormData) => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Creating delivery...');

    try {
      const result = await createDelivery({
        sender: address,
        amount: parseFloat(data.amount),
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        description: data.description,
      });

      toast.success('Delivery created successfully! Payment locked in escrow.', { id: toastId });
      reset();

      // Redirect to deliveries page after 2 seconds
      setTimeout(() => {
        router.push('/deliveries');
      }, 2000);
    } catch (error) {
      const errorMessage = getUserErrorMessage(error);
      toast.error(errorMessage, { id: toastId });
      logError(error, 'Create Delivery');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-yellow-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-yellow-800">Wallet Not Connected</h2>
            <p className="text-yellow-700">
              Please connect your Freighter wallet to create a delivery.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-primary-600">Create New Delivery 📦</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white p-8 shadow-md">
          <div className="mb-6">
            <label htmlFor="pickupLocation" className="mb-2 block font-semibold text-gray-700">
              Pickup Location *
            </label>
            <input
              id="pickupLocation"
              type="text"
              {...register('pickupLocation')}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Enter pickup address"
            />
            {errors.pickupLocation && (
              <p className="mt-1 text-sm text-red-600">{errors.pickupLocation.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="deliveryLocation" className="mb-2 block font-semibold text-gray-700">
              Delivery Location *
            </label>
            <input
              id="deliveryLocation"
              type="text"
              {...register('deliveryLocation')}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Enter delivery address"
            />
            {errors.deliveryLocation && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryLocation.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="amount" className="mb-2 block font-semibold text-gray-700">
              Payment Amount (XLM) *
            </label>
            <input
              id="amount"
              type="number"
              step="0.0000001"
              {...register('amount')}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Enter amount in XLM"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
            <p className="mt-1 text-xs text-gray-500">
              This amount will be locked in escrow until delivery completion
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="mb-2 block font-semibold text-gray-700">
              Package Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Describe your package (optional)"
              rows={4}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary-600 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Delivery...' : 'Create Delivery & Lock Payment'}
          </button>
        </form>
      </div>
    </main>
  );
}
