/**
 * Internal types for the customer card get and remove operations.
 *
 * Both operations require the same identifiers, so this type is shared
 * between the `get` and `remove` REST implementations.
 *
 * @module clients/customerCard/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Internal payload forwarded to the `get` and `remove` REST implementations.
 */
export declare type CustomerCardGetRemoveClient = {
  /** Unique customer identifier assigned by MercadoPago. */
  customerId: string;
  /** Unique card identifier within the customer's wallet. */
  cardId: string;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};
