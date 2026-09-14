// Server-only client for the FaniLab backend API. Never import this from a
// 'use client' component — BACKEND_API_URL is intentionally not prefixed
// with NEXT_PUBLIC_ so it never reaches the browser bundle.

const REQUEST_TIMEOUT_MS = 4000;

// Mirrors the backend's own `deliveryDto` Zod schema and `serializeDelivery()`
// mapping (fanilabs/backend: src/modules/deliveries/interface/schemas.ts and
// interface/routes.ts). GET /api/v1/deliveries returns `{ data: Delivery[] }`.
export type DeliveryStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'DISPUTED'
  | 'CANCELLED';

export interface Delivery {
  id: string;
  chainDeliveryId: string;
  senderAddress: string;
  recipientAddress: string;
  driverAddress: string | null;
  status: DeliveryStatus;
  origin: string;
  destination: string;
  cargoCategory: string;
  weightGrams: number;
  fragile: boolean;
  createdAtChain: string;
  transitStartedAt: string | null;
  deliveredAt: string | null;
}

export type DeliveriesResult =
  | { status: 'ok'; deliveries: Delivery[] }
  | { status: 'unconfigured' }
  | { status: 'error'; message: string };

export async function getDeliveries(): Promise<DeliveriesResult> {
  const baseUrl = process.env.BACKEND_API_URL;
  if (!baseUrl) return { status: 'unconfigured' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/v1/deliveries`, {
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return { status: 'error', message: `Backend responded with ${res.status}` };
    }

    const json: unknown = await res.json();
    const data = json && typeof json === 'object' ? (json as { data?: unknown }).data : null;

    if (!Array.isArray(data)) {
      return { status: 'error', message: 'Unrecognized response shape from backend' };
    }

    return { status: 'ok', deliveries: data as Delivery[] };
  } catch {
    return { status: 'error', message: 'Could not reach the backend' };
  } finally {
    clearTimeout(timeout);
  }
}
