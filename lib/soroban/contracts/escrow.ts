/**
 * Escrow Contract Integration
 * Handles payment locking and release functionality
 */

import { xdr, Transaction } from 'stellar-sdk';
import {
  buildContractTransaction,
  executeTransaction,
  ESCROW_CONTRACT_ID,
  scValUtils,
  parseTransactionResult,
} from '../index';

export interface CreateEscrowParams {
  sender: string;
  recipient: string;
  amount: bigint;
  deliveryId: string;
  signTransaction: (xdr: string) => Promise<string>;
}

export interface ReleaseEscrowParams {
  escrowId: string;
  signer: string;
  signTransaction: (xdr: string) => Promise<string>;
}

export interface EscrowDetails {
  id: string;
  sender: string;
  recipient: string;
  amount: bigint;
  status: 'locked' | 'released' | 'disputed' | 'refunded';
  createdAt: bigint;
  releasedAt?: bigint;
  deliveryId: string;
}

/**
 * Create a new escrow and lock funds
 */
export async function createEscrow(params: CreateEscrowParams): Promise<string> {
  if (!ESCROW_CONTRACT_ID) {
    throw new Error('Escrow contract ID not configured');
  }

  const args = [
    scValUtils.toAddress(params.sender),
    scValUtils.toAddress(params.recipient),
    scValUtils.toU64(params.amount),
    scValUtils.toString(params.deliveryId),
  ];

  const transaction = await buildContractTransaction(
    ESCROW_CONTRACT_ID,
    'create_escrow',
    args,
    params.sender
  );

  const result = await executeTransaction(transaction, params.signTransaction);

  if (result.status !== 'SUCCESS') {
    throw new Error('Failed to create escrow');
  }

  const returnValue = parseTransactionResult(result);
  if (!returnValue) {
    throw new Error('No return value from contract');
  }

  return scValUtils.fromScVal(returnValue);
}

/**
 * Release escrow funds to recipient
 */
export async function releaseEscrow(params: ReleaseEscrowParams): Promise<boolean> {
  if (!ESCROW_CONTRACT_ID) {
    throw new Error('Escrow contract ID not configured');
  }

  const args = [scValUtils.toString(params.escrowId)];

  const transaction = await buildContractTransaction(
    ESCROW_CONTRACT_ID,
    'release_escrow',
    args,
    params.signer
  );

  const result = await executeTransaction(transaction, params.signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Request refund of escrow (sender only)
 */
export async function refundEscrow(
  escrowId: string,
  signer: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!ESCROW_CONTRACT_ID) {
    throw new Error('Escrow contract ID not configured');
  }

  const args = [scValUtils.toString(escrowId)];

  const transaction = await buildContractTransaction(
    ESCROW_CONTRACT_ID,
    'refund_escrow',
    args,
    signer
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}

/**
 * Get escrow details by ID
 */
export async function getEscrowDetails(escrowId: string): Promise<EscrowDetails | null> {
  if (!ESCROW_CONTRACT_ID) {
    throw new Error('Escrow contract ID not configured');
  }

  try {
    // For reading data, we use a simpler approach without signing
    // This would be implemented based on your contract's view functions
    // For now, returning null as contracts may not have view functions
    return null;
  } catch (error) {
    console.error('Failed to get escrow details:', error);
    return null;
  }
}

/**
 * Dispute an escrow
 */
export async function disputeEscrow(
  escrowId: string,
  reason: string,
  signer: string,
  signTransaction: (xdr: string) => Promise<string>
): Promise<boolean> {
  if (!ESCROW_CONTRACT_ID) {
    throw new Error('Escrow contract ID not configured');
  }

  const args = [scValUtils.toString(escrowId), scValUtils.toString(reason)];

  const transaction = await buildContractTransaction(
    ESCROW_CONTRACT_ID,
    'dispute_escrow',
    args,
    signer
  );

  const result = await executeTransaction(transaction, signTransaction);

  return result.status === 'SUCCESS';
}
