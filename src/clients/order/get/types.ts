/**
 * Request and internal-client types for the get order operation.
 *
 * @module clients/order/get/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Order.get}.
 */
export declare type OrderGetData = {
  /** Unique order identifier to retrieve. */
  id: string;
  /** Per-call request options (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the get order REST call.
 */
export declare type OrderGetClient = {
  /** SDK configuration (access token, default options). */
  config: MercadoPagoConfig;
  /** Unique order identifier to retrieve. */
  id: string;
}