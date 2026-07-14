/**
 * Delivery Contract Integration
 * Manages delivery lifecycle and state transitions
 */

import { xdr, Transaction } from 'stellar-sdk';
import {
  buildContractTransaction,
  executeTransaction,
  DELIVERY_CONTRACT_ID,
  scValUtils,
  parseTransactionResult,
} from '../index';

export enum DeliveryStatus {
  PENDING = 0,
  ACCEPTED = 1,
  PICKED_UP = 2,
  IN_TRANSIT = 3,
  DELIVERED = 4,
  COMPLETED = 5,
  CANCELLED = 6,
  DISPUTED = 7,
}

export interface CreateDeliveryParams {
  sender: string;
  pickupLocation: string;
  deliveryLocation: string;
  amount: bigint;
  description?: string;
  signTransaction: (xdr: string) => Promise<string>;
}

export interface DeliveryDetails {
  id: string;
  sender: string;
  driver?: string;
  recipient: string;
  pickupLocation: string;
  deliveryLocation: string;
  amount: bigint;
  status: DeliveryStatus;
  escrowId: string;
  createdAt: bigint;
  acceptedAt?: bigint;
  completedAt?: bigint;
  description?: string;
}

/**
 * Create a new delivery request
 */
export async function createDelivery(params: CreateDeliveryParams): Promise<string> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [
    scValUtils.toAddress(params.sender),
    scValUtils.toString(params.pickupLocation),
    scValUtils.toString(params.deliveryLocation),
    scValUtils.toU64(params.amount),
    scValUtils.toString(params.description || ''),
  ];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'create_delivery',
    args,
    params.sender
  );

  const result = await executeTransaction(transaction, params.signTransaction);

  if (result.status !== 'SUCCESS') {
    throw new Error('Failed to create delivery');
  }

  const returnValue = parseTransactionResult(result);
  if (!returnValue) {
    throw new Error('No return value from contract');
  }

  return scValUtils.fromScVal(returnValue);
}

/**
 * Accept a delivery as a driver
 */
export async function acceptDelivery(
  deliveryId: string,
  driver: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId), scValUtils.toAddress(driver)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'accept_delivery',
    args,
    driver
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Mark delivery as picked up
 */
export async function pickupDelivery(
  deliveryId: string,
  driver: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'pickup_delivery',
    args,
    driver
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Update delivery status to in transit
 */
export async function startTransit(
  deliveryId: string,
  driver: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'start_transit',
    args,
    driver
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Mark delivery as delivered (awaiting confirmation)
 */
export async function markDelivered(
  deliveryId: string,
  driver: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'mark_delivered',
    args,
    driver
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Confirm delivery completion (triggers escrow release)
 */
export async function confirmDelivery(
  deliveryId: string,
  recipient: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'confirm_delivery',
    args,
    recipient
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Cancel a delivery (only if not yet accepted)
 */
export async function cancelDelivery(
  deliveryId: string,
  sender: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  const args = [scValUtils.toString(deliveryId)];

  const transaction = await buildContractTransaction(
    DELIVERY_CONTRACT_ID,
    'cancel_delivery',
    args,
    sender
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Get delivery details by ID
 */
export async function getDeliveryDetails(deliveryId: string): Promise<DeliveryDetails | null> {
  if (!DELIVERY_CONTRACT_ID) {
    throw new Error('Delivery contract ID not configured');
  }

  try {
    // Read-only contract calls would be implemented here
    // This depends on your contract having view/query functions
    return null;
  } catch (error) {
    console.error('Failed to get delivery details:', error);
    return null;
  }
}
