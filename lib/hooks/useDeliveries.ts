/**
 * Custom hook for delivery operations
 * Integrates with SWR for data fetching and caching
 */

import useSWR from 'swr';
import { Delivery } from '@/types';
import { listDeliveries, getUserDeliveries } from '../contracts';

const fetcher = async (url: string) => {
  if (url.includes('/user/')) {
    const address = url.split('/user/')[1];
    return getUserDeliveries(address);
  }
  return listDeliveries();
};

/**
 * Hook to fetch all deliveries with auto-refresh
 */
export function useDeliveries() {
  const { data, error, isLoading, mutate } = useSWR<Delivery[]>('/deliveries', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
  });

  return {
    deliveries: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

/**
 * Hook to fetch user-specific deliveries
 */
export function useUserDeliveries(userAddress: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Delivery[]>(
    userAddress ? `/deliveries/user/${userAddress}` : null,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  return {
    deliveries: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
