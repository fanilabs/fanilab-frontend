/**
 * Delivery State Management with Zustand
 * Manages delivery data and operations
 */

import { create } from 'zustand';
import { Delivery, DeliveryStatus } from '@/types';

export interface DeliveryState {
  // State
  deliveries: Delivery[];
  userDeliveries: Delivery[];
  activeDelivery: Delivery | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setDeliveries: (deliveries: Delivery[]) => void;
  setUserDeliveries: (deliveries: Delivery[]) => void;
  setActiveDelivery: (delivery: Delivery | null) => void;
  addDelivery: (delivery: Delivery) => void;
  updateDelivery: (id: string, updates: Partial<Delivery>) => void;
  removeDelivery: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  // Initial state
  deliveries: [],
  userDeliveries: [],
  activeDelivery: null,
  isLoading: false,
  error: null,

  // Set all deliveries
  setDeliveries: (deliveries) => set({ deliveries }),

  // Set user-specific deliveries
  setUserDeliveries: (userDeliveries) => set({ userDeliveries }),

  // Set active delivery
  setActiveDelivery: (activeDelivery) => set({ activeDelivery }),

  // Add new delivery
  addDelivery: (delivery) =>
    set((state) => ({
      deliveries: [delivery, ...state.deliveries],
    })),

  // Update existing delivery
  updateDelivery: (id, updates) =>
    set((state) => ({
      deliveries: state.deliveries.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      userDeliveries: state.userDeliveries.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      activeDelivery:
        state.activeDelivery?.id === id ? { ...state.activeDelivery, ...updates } : state.activeDelivery,
    })),

  // Remove delivery
  removeDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.filter((d) => d.id !== id),
      userDeliveries: state.userDeliveries.filter((d) => d.id !== id),
      activeDelivery: state.activeDelivery?.id === id ? null : state.activeDelivery,
    })),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () =>
    set({
      deliveries: [],
      userDeliveries: [],
      activeDelivery: null,
      isLoading: false,
      error: null,
    }),
}));
