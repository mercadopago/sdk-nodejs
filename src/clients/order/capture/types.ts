/**
 * Request and internal-client types for the capture order operation.
 *
 * @module clients/order/capture/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Order.capture}.
 */
export declare type OrderCaptureData = {
  /** Unique order identifier to capture. */
  id: string;
  /** Per-call request options (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal client payload passed to the capture order REST call.
 */
export declare type OrderCaptureClient = {
  /** SDK configuration (access token, default options). */
  config: MercadoPagoConfig;
  /** Unique order identifier to capture. */
  id: string;
}
