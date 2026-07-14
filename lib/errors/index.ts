/**
 * Centralized Error Handling
 * Type-safe error definitions and handlers
 */

export enum ErrorCode {
  // Wallet errors
  WALLET_NOT_INSTALLED = 'WALLET_NOT_INSTALLED',
  WALLET_CONNECTION_FAILED = 'WALLET_CONNECTION_FAILED',
  WALLET_DISCONNECTED = 'WALLET_DISCONNECTED',
  WRONG_NETWORK = 'WRONG_NETWORK',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  USER_REJECTED = 'USER_REJECTED',

  // Transaction errors
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  TRANSACTION_TIMEOUT = 'TRANSACTION_TIMEOUT',
  SIMULATION_FAILED = 'SIMULATION_FAILED',
  CONTRACT_ERROR = 'CONTRACT_ERROR',

  // Delivery errors
  DELIVERY_NOT_FOUND = 'DELIVERY_NOT_FOUND',
  DELIVERY_ALREADY_ACCEPTED = 'DELIVERY_ALREADY_ACCEPTED',
  INVALID_STATUS_TRANSITION = 'INVALID_STATUS_TRANSITION',
  UNAUTHORIZED_ACTION = 'UNAUTHORIZED_ACTION',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  RPC_ERROR = 'RPC_ERROR',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // General errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class FaniLabError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'FaniLabError';
  }
}

/**
 * Parse error messages from various sources
 */
export function parseError(error: unknown): FaniLabError {
  // Already a FaniLabError
  if (error instanceof FaniLabError) {
    return error;
  }

  // Standard Error
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Wallet errors
    if (message.includes('freighter') || message.includes('wallet')) {
      if (message.includes('not installed') || message.includes('not found')) {
        return new FaniLabError(
          ErrorCode.WALLET_NOT_INSTALLED,
          'Freighter wallet is not installed. Please install it from https://freighter.app',
          error
        );
      }
      if (message.includes('declined') || message.includes('rejected')) {
        return new FaniLabError(ErrorCode.USER_REJECTED, 'Transaction rejected by user', error);
      }
      if (message.includes('network')) {
        return new FaniLabError(
          ErrorCode.WRONG_NETWORK,
          'Please switch to the correct network in your wallet',
          error
        );
      }
      return new FaniLabError(ErrorCode.WALLET_CONNECTION_FAILED, error.message, error);
    }

    // Transaction errors
    if (message.includes('simulation')) {
      return new FaniLabError(
        ErrorCode.SIMULATION_FAILED,
        'Transaction simulation failed. Please check your inputs.',
        error
      );
    }
    if (message.includes('timeout')) {
      return new FaniLabError(
        ErrorCode.TRANSACTION_TIMEOUT,
        'Transaction timed out. Please try again.',
        error
      );
    }
    if (message.includes('insufficient')) {
      return new FaniLabError(
        ErrorCode.INSUFFICIENT_BALANCE,
        'Insufficient balance to complete transaction',
        error
      );
    }

    // Network errors
    if (message.includes('network') || message.includes('fetch')) {
      return new FaniLabError(ErrorCode.NETWORK_ERROR, 'Network error. Please try again.', error);
    }

    return new FaniLabError(ErrorCode.UNKNOWN_ERROR, error.message, error);
  }

  // String error
  if (typeof error === 'string') {
    return new FaniLabError(ErrorCode.UNKNOWN_ERROR, error);
  }

  // Unknown error type
  return new FaniLabError(ErrorCode.UNKNOWN_ERROR, 'An unexpected error occurred');
}

/**
 * Get user-friendly error message
 */
export function getUserErrorMessage(error: unknown): string {
  const faniLabError = parseError(error);

  const messages: Record<ErrorCode, string> = {
    [ErrorCode.WALLET_NOT_INSTALLED]:
      'Freighter wallet is not installed. Please install it from freighter.app',
    [ErrorCode.WALLET_CONNECTION_FAILED]: 'Failed to connect wallet. Please try again.',
    [ErrorCode.WALLET_DISCONNECTED]: 'Wallet disconnected. Please reconnect.',
    [ErrorCode.WRONG_NETWORK]: 'Please switch to the correct network in your Freighter wallet.',
    [ErrorCode.INSUFFICIENT_BALANCE]: 'Insufficient balance to complete this transaction.',
    [ErrorCode.USER_REJECTED]: 'Transaction cancelled by user.',
    [ErrorCode.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
    [ErrorCode.TRANSACTION_TIMEOUT]: 'Transaction timed out. Please try again.',
    [ErrorCode.SIMULATION_FAILED]: 'Transaction simulation failed. Please check your inputs.',
    [ErrorCode.CONTRACT_ERROR]: 'Smart contract error. Please try again.',
    [ErrorCode.DELIVERY_NOT_FOUND]: 'Delivery not found.',
    [ErrorCode.DELIVERY_ALREADY_ACCEPTED]: 'This delivery has already been accepted.',
    [ErrorCode.INVALID_STATUS_TRANSITION]: 'Invalid delivery status transition.',
    [ErrorCode.UNAUTHORIZED_ACTION]: 'You are not authorized to perform this action.',
    [ErrorCode.NETWORK_ERROR]: 'Network error. Please check your connection.',
    [ErrorCode.API_ERROR]: 'API error. Please try again later.',
    [ErrorCode.RPC_ERROR]: 'RPC error. Please try again.',
    [ErrorCode.VALIDATION_ERROR]: 'Validation error. Please check your inputs.',
    [ErrorCode.INVALID_INPUT]: 'Invalid input. Please check your data.',
    [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
  };

  return messages[faniLabError.code] || faniLabError.message;
}

/**
 * Log error for monitoring
 */
export function logError(error: unknown, context?: string) {
  const faniLabError = parseError(error);

  console.error(`[FaniLab Error${context ? ` - ${context}` : ''}]`, {
    code: faniLabError.code,
    message: faniLabError.message,
    details: faniLabError.details,
    stack: faniLabError.stack,
  });

  // In production, send to error tracking service (e.g., Sentry)
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(faniLabError);
  // }
}
