/**
 * Types for the "update subscription plan" operation.
 *
 * @module clients/preApprovalPlan/update/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalPlanRequest } from '@src/clients/preApprovalPlan/commonTypes';
import type { Options } from '@src/types';

/**
 * Simple wrapper carrying just the subscription plan identifier.
 */
export declare type PreApprovalPlanId = {
  /** Unique subscription plan identifier. */
  preApprovalPlanId: string;
};

/**
 * Internal payload passed to the update REST call.
 */
export declare type UpdatePreApprovalPlanUpdateClient = {
  /** Unique plan identifier to update. */
  id: string;
  /** Fields to modify on the plan. */
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Public-facing input for {@link PreApprovalPlan.update}.
 */
export declare type UpdatePreApprovalPlanUpdateData = {
  /** Unique plan identifier to update. */
  id: string;
  /** Fields to modify on the plan. */
  updatePreApprovalPlanRequest: PreApprovalPlanRequest;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}
