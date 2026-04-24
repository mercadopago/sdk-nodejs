/**
 * Internal types for the customer retrieval operation.
 *
 * @module clients/customer/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Internal payload forwarded to the `get` REST implementation.
 */
export declare type CustomerGetClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};
