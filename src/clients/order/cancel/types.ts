/**
 * Request and internal-client types for the cancel order operation.
 *
 * @module clients/order/cancel/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Order.cancel}.
 */
export declare type OrderCancelData = {
  /** Unique order identifier to cancel. */
  id: string;
  /** Per-call request options (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the cancel order REST call.
 */
export declare type OrderCancelClient = {
  /** SDK configuration (access token, default options). */
  config: MercadoPagoConfig;
  /** Unique order identifier to cancel. */
  id: string;
}