/**
 * Types for the "get subscription" operation.
 *
 * @module clients/preApproval/get/types
 */

import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Public-facing input for {@link PreApproval.get}.
 */
export declare type PreApprovalGetData = {
  /** Unique subscription identifier to retrieve. */
  id: string;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal payload passed to the get REST call.
 */
export declare type PreApprovalGetClient = {
  /** Unique subscription identifier. */
  id: string;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
}

