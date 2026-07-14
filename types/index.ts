// Core types for SwiftChain application

export interface Delivery {
  id: string;
  sender: string;
  driver: string | null;
  recipient: string;
  pickupLocation: string;
  deliveryLocation: string;
  amount: number;
  status: DeliveryStatus;
  createdAt: number;
  acceptedAt?: number;
  completedAt?: number;
  description?: string;
}

export enum DeliveryStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled',
}

export interface Escrow {
  id: string;
  deliveryId: string;
  amount: number;
  sender: string;
  recipient: string;
  status: EscrowStatus;
  lockedAt: number;
  releasedAt?: number;
}

export enum EscrowStatus {
  LOCKED = 'locked',
  RELEASED = 'released',
  DISPUTED = 'disputed',
  REFUNDED = 'refunded',
}

export interface User {
  address: string;
  reputation: number;
  totalDeliveries: number;
  completedDeliveries: number;
  totalEarnings: number;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: number;
}

export interface CreateDeliveryParams {
  sender: string;
  amount: number;
  pickupLocation: string;
  deliveryLocation: string;
  description?: string;
}

export interface AcceptDeliveryParams {
  deliveryId: string;
  driverAddress: string;
}

export interface ConfirmDeliveryParams {
  deliveryId: string;
  recipientAddress: string;
}
