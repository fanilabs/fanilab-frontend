/**
 * Core Soroban SDK Integration
 * Production-ready Stellar smart contract interaction layer
 */

import {
  Account,
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Transaction,
  xdr,
  BASE_FEE,
  Networks,
  Address,
} from 'stellar-sdk';

// Network configuration
export const NETWORK = (process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet') as
  'testnet' | 'mainnet' | 'futurenet';

export const SOROBAN_RPC_URL =
  process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org';

export const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || Networks.TESTNET;

// Contract IDs
export const ESCROW_CONTRACT_ID = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || '';
export const DELIVERY_CONTRACT_ID = process.env.NEXT_PUBLIC_DELIVERY_CONTRACT_ID || '';
export const DISPUTE_CONTRACT_ID = process.env.NEXT_PUBLIC_DISPUTE_CONTRACT_ID || '';

/**
 * Get Soroban RPC Server instance
 */
export function getSorobanServer(): SorobanRpc.Server {
  return new SorobanRpc.Server(SOROBAN_RPC_URL, {
    allowHttp: NETWORK === 'testnet' || NETWORK === 'futurenet',
  });
}

/**
 * Get network passphrase based on environment
 */
export function getNetworkPassphrase(): string {
  return NETWORK_PASSPHRASE;
}

/**
 * Load account from the blockchain
 */
export async function loadAccount(publicKey: string): Promise<Account> {
  const server = getSorobanServer();
  // SorobanRpc.Server.getAccount returns an Account object directly
  return await server.getAccount(publicKey);
}

/**
 * Build a Soroban contract invocation transaction
 */
export async function buildContractTransaction(
  contractId: string,
  method: string,
  args: xdr.ScVal[],
  sourcePublicKey: string
): Promise<Transaction> {
  const server = getSorobanServer();
  const sourceAccount = await loadAccount(sourcePublicKey);

  const contract = new Contract(contractId);

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(180)
    .build();

  return transaction;
}

/**
 * Simulate a transaction to get the resource requirements
 */
export async function simulateTransaction(
  transaction: Transaction
): Promise<SorobanRpc.Api.SimulateTransactionResponse> {
  const server = getSorobanServer();
  return await server.simulateTransaction(transaction);
}

/**
 * Prepare transaction with simulation results
 */
export async function prepareTransaction(transaction: Transaction): Promise<Transaction> {
  const server = getSorobanServer();
  const simulated = await simulateTransaction(transaction);

  if (SorobanRpc.Api.isSimulationError(simulated)) {
    throw new Error(`Simulation failed: ${simulated.error}`);
  }

  if (!simulated.result) {
    throw new Error('Simulation did not return results');
  }

  return SorobanRpc.assembleTransaction(transaction, simulated).build();
}

/**
 * Submit transaction to the network
 */
export async function submitTransaction(
  transaction: Transaction
): Promise<SorobanRpc.Api.SendTransactionResponse> {
  const server = getSorobanServer();
  return await server.sendTransaction(transaction);
}

/**
 * Poll transaction status until completion
 */
export async function pollTransactionStatus(
  hash: string,
  timeout = 60000
): Promise<SorobanRpc.Api.GetTransactionResponse> {
  const server = getSorobanServer();
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const response = await server.getTransaction(hash);

    if (response.status !== 'NOT_FOUND') {
      return response;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('Transaction polling timeout');
}

/**
 * Complete transaction flow: prepare, sign, submit, and poll
 */
export async function executeTransaction(
  transaction: Transaction,
  signTransaction: (xdr: string) => Promise<string>
): Promise<SorobanRpc.Api.GetTransactionResponse> {
  // Prepare transaction with resource estimates
  const prepared = await prepareTransaction(transaction);

  // Sign transaction
  const signedXdr = await signTransaction(prepared.toXDR());
  const signedTransaction = TransactionBuilder.fromXDR(signedXdr, getNetworkPassphrase());

  // Submit transaction
  const result = await submitTransaction(signedTransaction as Transaction);

  if (result.status === 'ERROR') {
    throw new Error(`Transaction failed: ${result.errorResult?.toXDR('base64')}`);
  }

  // Poll for completion
  return await pollTransactionStatus(result.hash);
}

/**
 * Parse transaction result
 */
export function parseTransactionResult(
  response: SorobanRpc.Api.GetTransactionResponse
): xdr.ScVal | null {
  if (response.status !== 'SUCCESS' || !response.resultMetaXdr) {
    return null;
  }

  const meta = response.resultMetaXdr;

  if (meta.switch() !== 3) {
    return null;
  }

  const v3 = meta.v3();
  const sorobanMeta = v3.sorobanMeta();

  if (!sorobanMeta) {
    return null;
  }

  return sorobanMeta.returnValue();
}

/**
 * Convert JavaScript values to ScVal for contract calls
 */
export const scValUtils = {
  toU64(value: number | bigint): xdr.ScVal {
    return xdr.ScVal.scvU64(new xdr.Uint64(BigInt(value)));
  },

  toI64(value: number | bigint): xdr.ScVal {
    return xdr.ScVal.scvI64(new xdr.Int64(BigInt(value)));
  },

  toU32(value: number): xdr.ScVal {
    return xdr.ScVal.scvU32(value);
  },

  toI32(value: number): xdr.ScVal {
    return xdr.ScVal.scvI32(value);
  },

  toString(value: string): xdr.ScVal {
    return xdr.ScVal.scvString(value);
  },

  toSymbol(value: string): xdr.ScVal {
    return xdr.ScVal.scvSymbol(value);
  },

  toAddress(address: string): xdr.ScVal {
    return new Address(address).toScVal();
  },

  toBool(value: boolean): xdr.ScVal {
    return xdr.ScVal.scvBool(value);
  },

  toVec(values: xdr.ScVal[]): xdr.ScVal {
    return xdr.ScVal.scvVec(values);
  },

  toMap(entries: [xdr.ScVal, xdr.ScVal][]): xdr.ScVal {
    const mapEntries = entries.map(([key, val]) => new xdr.ScMapEntry({ key, val }));
    return xdr.ScVal.scvMap(mapEntries);
  },

  /**
   * Parse ScVal to JavaScript values
   */
  fromScVal(val: xdr.ScVal): any {
    switch (val.switch()) {
      case xdr.ScValType.scvBool():
        return val.b();
      case xdr.ScValType.scvU32():
        return val.u32();
      case xdr.ScValType.scvI32():
        return val.i32();
      case xdr.ScValType.scvU64():
        return val.u64().toBigInt();
      case xdr.ScValType.scvI64():
        return val.i64().toBigInt();
      case xdr.ScValType.scvString():
        return val.str().toString();
      case xdr.ScValType.scvSymbol():
        return val.sym().toString();
      case xdr.ScValType.scvVec(): {
        const vec = val.vec();
        return vec ? vec.map((v) => this.fromScVal(v)) : [];
      }
      case xdr.ScValType.scvMap(): {
        const map = val.map();
        if (!map) return {};
        const obj: any = {};
        map.forEach((entry) => {
          const key = this.fromScVal(entry.key());
          const value = this.fromScVal(entry.val());
          obj[key] = value;
        });
        return obj;
      }
      case xdr.ScValType.scvAddress():
        return Address.fromScVal(val).toString();
      default:
        return null;
    }
  },
};

/**
 * Get account balance in XLM
 */
export async function getAccountBalance(publicKey: string): Promise<string> {
  try {
    // Use Horizon server for account balance queries
    const { Horizon } = await import('stellar-sdk');
    const horizonUrl =
      NETWORK === 'mainnet' ? 'https://horizon.stellar.org' : 'https://horizon-testnet.stellar.org';
    const horizonServer = new Horizon.Server(horizonUrl);

    const account = await horizonServer.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b: any) => b.asset_type === 'native') as any;
    return nativeBalance ? nativeBalance.balance : '0';
  } catch (error) {
    console.error('Failed to get balance:', error);
    return '0';
  }
}
