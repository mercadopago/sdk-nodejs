/**
 * Types for the "create subscription" operation.
 *
 * Separates the internal client payload (includes config) from the
 * public-facing data type the SDK consumer passes to {@link PreApproval.create}.
 *
 * @module clients/preApproval/create/types
 */

import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreApprovalRequest } from '@src/clients/preApproval/commonTypes';

/**
 * Public-facing input for {@link PreApproval.create}.
 */
export declare type PreApprovalCreateData = {
  /** Subscription request body with billing and payer details. */
  body: PreApprovalRequest,
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Internal payload passed to the create REST call.
 */
export declare type PreApprovalCreateClient = {
  /** Subscription request body with billing and payer details. */
  body: PreApprovalRequest;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
}

