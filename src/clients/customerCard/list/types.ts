/**
 * Request and internal types for the customer card list operation.
 *
 * @module clients/customerCard/list/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal payload forwarded to the `list` REST implementation.
 */
export declare type CustomerCardListClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link CustomerCard.list} and {@link Customer.listCards}.
 */
export declare type CustomerCardListData = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};
