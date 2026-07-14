import { describe, it, expect } from 'vitest';
import { parseError, getUserErrorMessage, ErrorCode, FaniLabError } from '@/lib/errors';

describe('Error Handling', () => {
  describe('parseError', () => {
    it('should return FaniLabError as-is', () => {
      const error = new FaniLabError(ErrorCode.WALLET_NOT_INSTALLED, 'Wallet not found');
      const result = parseError(error);
      expect(result).toBe(error);
    });

    it('should parse wallet not installed error', () => {
      const error = new Error('Freighter wallet is not installed');
      const result = parseError(error);
      expect(result.code).toBe(ErrorCode.WALLET_NOT_INSTALLED);
    });

    it('should parse user rejection error', () => {
      const error = new Error('User declined the request');
      const result = parseError(error);
      expect(result.code).toBe(ErrorCode.USER_REJECTED);
    });

    it('should parse network error', () => {
      const error = new Error('Network request failed');
      const result = parseError(error);
      expect(result.code).toBe(ErrorCode.NETWORK_ERROR);
    });

    it('should handle string errors', () => {
      const error = 'Something went wrong';
      const result = parseError(error);
      expect(result).toBeInstanceOf(FaniLabError);
      expect(result.message).toBe(error);
    });

    it('should handle unknown error types', () => {
      const error = { unknown: 'object' };
      const result = parseError(error);
      expect(result.code).toBe(ErrorCode.UNKNOWN_ERROR);
    });
  });

  describe('getUserErrorMessage', () => {
    it('should return user-friendly message for wallet errors', () => {
      const error = new FaniLabError(ErrorCode.WALLET_NOT_INSTALLED, 'Technical message');
      const message = getUserErrorMessage(error);
      expect(message).toContain('Freighter wallet');
      expect(message).toContain('freighter.app');
    });

    it('should return user-friendly message for transaction errors', () => {
      const error = new FaniLabError(ErrorCode.TRANSACTION_FAILED, 'Technical message');
      const message = getUserErrorMessage(error);
      expect(message).toContain('Transaction failed');
    });

    it('should handle regular errors', () => {
      const error = new Error('Some error');
      const message = getUserErrorMessage(error);
      expect(message).toBeTruthy();
    });
  });
});
