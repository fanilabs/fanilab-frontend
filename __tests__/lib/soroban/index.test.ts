import { describe, it, expect } from 'vitest';
import { scValUtils } from '@/lib/soroban';
import { xdr } from 'stellar-sdk';

describe('Soroban Utils', () => {
  describe('scValUtils', () => {
    it('should convert number to U64', () => {
      const result = scValUtils.toU64(1000);
      expect(result.switch()).toBe(xdr.ScValType.scvU64());
    });

    it('should convert string to ScVal', () => {
      const result = scValUtils.toString('hello');
      expect(result.switch()).toBe(xdr.ScValType.scvString());
    });

    it('should convert boolean to ScVal', () => {
      const result = scValUtils.toBool(true);
      expect(result.switch()).toBe(xdr.ScValType.scvBool());
    });

    it('should convert array to Vec', () => {
      const values = [scValUtils.toU32(1), scValUtils.toU32(2)];
      const result = scValUtils.toVec(values);
      expect(result.switch()).toBe(xdr.ScValType.scvVec());
    });

    it('should parse U32 from ScVal', () => {
      const scVal = scValUtils.toU32(42);
      const result = scValUtils.fromScVal(scVal);
      expect(result).toBe(42);
    });

    it('should parse string from ScVal', () => {
      const scVal = scValUtils.toString('test');
      const result = scValUtils.fromScVal(scVal);
      expect(result).toBe('test');
    });

    it('should parse boolean from ScVal', () => {
      const scVal = scValUtils.toBool(true);
      const result = scValUtils.fromScVal(scVal);
      expect(result).toBe(true);
    });

    it('should parse Vec from ScVal', () => {
      const values = [scValUtils.toU32(1), scValUtils.toU32(2)];
      const scVal = scValUtils.toVec(values);
      const result = scValUtils.fromScVal(scVal);
      expect(result).toEqual([1, 2]);
    });
  });
});
