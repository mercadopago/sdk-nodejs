/**
 * Types for the "get subscription plan" operation.
 *
 * @module clients/preApprovalPlan/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Internal payload passed to the get REST call.
 */
export declare type PreApprovalPlanGetClient = {
  /** Unique plan identifier. */
  id: string;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Public-facing input for {@link PreApprovalPlan.get}.
 */
export declare type PreApprovalPlanGetData = {
  /** Unique subscription plan identifier to retrieve. */
  preApprovalPlanId: string;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
};
