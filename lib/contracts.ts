/**
 * High-level Contract API
 * User-friendly interface for interacting with Stellar smart contracts
 */

import { createDelivery as createDeliveryContract, acceptDelivery as acceptDeliveryContract, confirmDelivery as confirmDeliveryContract, cancelDelivery as cancelDeliveryContract, DeliveryStatus } from './soroban/contracts/delivery';
import { createEscrow, releaseEscrow, refundEscrow, disputeEscrow } from './soroban/contracts/escrow';
import { signTransactionWithFreighter } from './stellar';
import { Delivery } from '@/types';

/**
 * Create a new delivery with escrow
 */
export async function createDelivery(params: {
  sender: string;
  amount: number;
  pickupLocation: string;
  deliveryLocation: string;
  description?: string;
}): Promise<{ deliveryId: string; escrowId: string }> {
  try {
    // Convert amount to stroops (1 XLM = 10,000,000 stroops)
    const amountInStroops = BigInt(Math.floor(params.amount * 10_000_000));

    // Create delivery on blockchain
    const deliveryId = await createDeliveryContract({
      sender: params.sender,
      pickupLocation: params.pickupLocation,
      deliveryLocation: params.deliveryLocation,
      amount: amountInStroops,
      description: params.description,
      signTransaction: signTransactionWithFreighter,
    });

    // Create escrow for the delivery
    const escrowId = await createEscrow({
      sender: params.sender,
      recipient: params.sender, // Will be updated when driver accepts
      amount: amountInStroops,
      deliveryId: deliveryId,
      signTransaction: signTransactionWithFreighter,
    });

    return {
      deliveryId,
      escrowId,
    };
  } catch (error: any) {
    console.error('Create delivery error:', error);
    throw new Error(error.message || 'Failed to create delivery');
  }
}

/**
 * Accept a delivery as a driver
 */
export async function acceptDelivery(params: {
  deliveryId: string;
  driverAddress: string;
}): Promise<boolean> {
  try {
    const success = await acceptDeliveryContract(
      params.deliveryId,
      params.driverAddress,
      signTransactionWithFreighter
    );

    if (!success) {
      throw new Error('Failed to accept delivery on blockchain');
    }

    return true;
  } catch (error: any) {
    console.error('Accept delivery error:', error);
    throw new Error(error.message || 'Failed to accept delivery');
  }
}

/**
 * Confirm delivery completion and release payment
 */
export async function confirmDelivery(params: {
  deliveryId: string;
  recipientAddress: string;
  escrowId: string;
}): Promise<boolean> {
  try {
    // Confirm delivery on blockchain
    const deliveryConfirmed = await confirmDeliveryContract(
      params.deliveryId,
      params.recipientAddress,
      signTransactionWithFreighter
    );

    if (!deliveryConfirmed) {
      throw new Error('Failed to confirm delivery on blockchain');
    }

    // Release escrow payment
    const paymentReleased = await releaseEscrow({
      escrowId: params.escrowId,
      signer: params.recipientAddress,
      signTransaction: signTransactionWithFreighter,
    });

    if (!paymentReleased) {
      throw new Error('Failed to release payment');
    }

    return true;
  } catch (error: any) {
    console.error('Confirm delivery error:', error);
    throw new Error(error.message || 'Failed to confirm delivery');
  }
}

/**
 * Cancel a delivery (only if not accepted yet)
 */
export async function cancelDeliveryRequest(params: {
  deliveryId: string;
  senderAddress: string;
  escrowId: string;
}): Promise<boolean> {
  try {
    // Cancel delivery on blockchain
    const cancelled = await cancelDeliveryContract(
      params.deliveryId,
      params.senderAddress,
      signTransactionWithFreighter
    );

    if (!cancelled) {
      throw new Error('Failed to cancel delivery on blockchain');
    }

    // Refund escrow
    const refunded = await refundEscrow(
      params.escrowId,
      params.senderAddress,
      signTransactionWithFreighter
    );

    if (!refunded) {
      throw new Error('Failed to refund escrow');
    }

    return true;
  } catch (error: any) {
    console.error('Cancel delivery error:', error);
    throw new Error(error.message || 'Failed to cancel delivery');
  }
}

/**
 * Dispute a delivery
 */
export async function disputeDelivery(params: {
  deliveryId: string;
  escrowId: string;
  reason: string;
  signer: string;
}): Promise<boolean> {
  try {
    const disputed = await disputeEscrow(
      params.escrowId,
      params.reason,
      params.signer,
      signTransactionWithFreighter
    );

    if (!disputed) {
      throw new Error('Failed to create dispute');
    }

    return true;
  } catch (error: any) {
    console.error('Dispute delivery error:', error);
    throw new Error(error.message || 'Failed to dispute delivery');
  }
}

/**
 * List all deliveries (from API/indexer)
 * In production, this would call your backend API which indexes blockchain events
 */
export async function listDeliveries(): Promise<Delivery[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      // Return empty array if no API configured
      console.warn('API URL not configured, returning empty deliveries');
      return [];
    }

    const response = await fetch(`${apiUrl}/api/deliveries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.deliveries || [];
  } catch (error: any) {
    console.error('List deliveries error:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
}

/**
 * Get delivery details by ID
 */
export async function getDeliveryDetails(deliveryId: string): Promise<Delivery | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.warn('API URL not configured');
      return null;
    }

    const response = await fetch(`${apiUrl}/api/deliveries/${deliveryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.delivery || null;
  } catch (error: any) {
    console.error('Get delivery details error:', error);
    return null;
  }
}

/**
 * Get user's deliveries
 */
export async function getUserDeliveries(userAddress: string): Promise<Delivery[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.warn('API URL not configured');
      return [];
    }

    const response = await fetch(`${apiUrl}/api/deliveries/user/${userAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.deliveries || [];
  } catch (error: any) {
    console.error('Get user deliveries error:', error);
    return [];
  }
}
