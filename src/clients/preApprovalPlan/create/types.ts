/**
 * Types for the "create subscription plan" operation.
 *
 * Separates the internal client payload (includes config) from the
 * public-facing data type the SDK consumer passes to {@link PreApprovalPlan.create}.
 *
 * @module clients/preApprovalPlan/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlan/commonTypes';
import type { Options } from '@src/types';

/**
 * Internal payload passed to the create REST call.
 */
export declare type PreApprovalPlanCreateClient = {
  /** Plan request body with billing rules and payment method restrictions. */
  body: PreApprovalPlanRequest;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Public-facing input for {@link PreApprovalPlan.create}.
 */
export declare type PreApprovalPlanCreateData = {
  /** Plan request body with billing rules and payment method restrictions. */
  body: PreApprovalPlanRequest;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}
