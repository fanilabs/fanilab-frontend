import { describe, it, expect } from 'vitest';
import { createDeliverySchema } from '@/lib/validations/delivery';

describe('Delivery Validation', () => {
  describe('createDeliverySchema', () => {
    it('should validate correct delivery data', () => {
      const validData = {
        pickupLocation: '123 Main St, City',
        deliveryLocation: '456 Oak Ave, Town',
        amount: '10.5',
        description: 'Package description',
      };

      const result = createDeliverySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject too short pickup location', () => {
      const invalidData = {
        pickupLocation: '123',
        deliveryLocation: '456 Oak Ave, Town',
        amount: '10.5',
      };

      const result = createDeliverySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 5 characters');
      }
    });

    it('should reject negative amount', () => {
      const invalidData = {
        pickupLocation: '123 Main St',
        deliveryLocation: '456 Oak Ave',
        amount: '-5',
      };

      const result = createDeliverySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject amount exceeding limit', () => {
      const invalidData = {
        pickupLocation: '123 Main St',
        deliveryLocation: '456 Oak Ave',
        amount: '10001',
      };

      const result = createDeliverySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should allow empty description', () => {
      const validData = {
        pickupLocation: '123 Main St',
        deliveryLocation: '456 Oak Ave',
        amount: '10',
        description: '',
      };

      const result = createDeliverySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject too many decimal places', () => {
      const invalidData = {
        pickupLocation: '123 Main St',
        deliveryLocation: '456 Oak Ave',
        amount: '10.12345678',
      };

      const result = createDeliverySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
