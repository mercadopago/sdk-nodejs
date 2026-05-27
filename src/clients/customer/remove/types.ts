/**
 * Internal types for the customer removal operation.
 *
 * @module clients/customer/remove/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Internal payload forwarded to the `remove` REST implementation.
 */
export declare type CustomerRemoveClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};
