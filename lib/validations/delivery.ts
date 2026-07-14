/**
 * Delivery Form Validation Schemas
 * Using Zod for type-safe validation
 */

import { z } from 'zod';

export const createDeliverySchema = z.object({
  pickupLocation: z
    .string()
    .min(5, 'Pickup location must be at least 5 characters')
    .max(200, 'Pickup location must not exceed 200 characters')
    .trim(),

  deliveryLocation: z
    .string()
    .min(5, 'Delivery location must be at least 5 characters')
    .max(200, 'Delivery location must not exceed 200 characters')
    .trim(),

  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Amount must be greater than 0' }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return num <= 10000;
      },
      { message: 'Amount must not exceed 10,000 XLM' }
    )
    .refine(
      (val) => {
        const decimals = val.split('.')[1];
        return !decimals || decimals.length <= 7;
      },
      { message: 'Amount can have maximum 7 decimal places' }
    ),

  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export type CreateDeliveryFormData = z.infer<typeof createDeliverySchema>;

export const disputeDeliverySchema = z.object({
  reason: z
    .string()
    .min(10, 'Reason must be at least 10 characters')
    .max(1000, 'Reason must not exceed 1000 characters')
    .trim(),
});

export type DisputeDeliveryFormData = z.infer<typeof disputeDeliverySchema>;
