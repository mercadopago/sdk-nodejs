/**
 * Types for the "update subscription" operation.
 *
 * Contains the update request body, internal client payload, public
 * SDK input, and the update-specific response type.
 *
 * @module clients/preApproval/update/types
 */

import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SummarizedResponse, AutoRecurringWithFreeTrial } from '@src/clients/preApproval/commonTypes';

/**
 * Internal payload passed to the update REST call.
 */
export declare type PreApprovalUpdateClient = {
  /** Unique subscription identifier to update. */
  id: string;
  /** Fields to modify on the subscription. */
  body: updatePreApprovalRequest;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig;
}

/**
 * Request body for updating an existing subscription.
 *
 * Only the fields that need to change should be provided.
 */
export declare type updatePreApprovalRequest = {
  /** Updated recurring billing schedule. */
  auto_recurring?: AutoRecurringRequest;
  /** Updated return URL after the buyer re-authorizes. */
  back_url?: string;
  /** New tokenised card identifier for recurring charges. */
  card_token_id?: string;
  /** Updated integrator-defined external reference. */
  external_reference?: string;
  /** Updated buyer email address. */
  payer_email?: string;
  /** Updated human-readable reason shown to the buyer. */
  reason?: string;
  /** Target subscription status (e.g. `authorized`, `paused`, `cancelled`). */
  status?: string;
}

/**
 * Simplified recurring billing fields allowed during an update.
 *
 * Only the amount and currency can be changed after creation;
 * frequency and schedule are immutable.
 */
export declare type AutoRecurringRequest = {
  /** New charge amount per billing cycle. */
  transaction_amount: number;
  /** ISO 4217 currency code (e.g. `ARS`, `BRL`). */
  currency_id: string;
}

/**
 * Public-facing input for {@link PreApproval.update}.
 */
export declare type PreApprovalUpdateData = {
  /** Unique subscription identifier to update. */
  id: string;
  /** Fields to modify on the subscription. */
  body: updatePreApprovalRequest;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * API response returned after updating a subscription.
 *
 * Contains the full updated subscription state.
 */
export declare type PreApprovalUpdateResponse = {
  /** Unique subscription identifier. */
  id?: string;
  /** Optimistic-concurrency version number. */
  version?: number;
  /** OAuth application identifier that created this subscription. */
  application_id?: number;
  /** Seller (collector) MercadoPago account identifier. */
  collector_id?: number;
  /** Associated subscription plan template identifier. */
  preapproval_plan_id?: string;
  /** Human-readable subscription reason. */
  reason?: string;
  /** Integrator-defined external reference. */
  external_reference?: number;
  /** Return URL after buyer authorization. */
  back_url?: string;
  /** URL to redirect the buyer to authorize the subscription. */
  init_point?: string;
  /** Recurring billing schedule with optional free-trial period. */
  auto_recurring?: AutoRecurringWithFreeTrial;
  /** Offset in days before the first invoice. */
  first_invoice_offset?: number;
  /** Buyer MercadoPago account identifier. */
  payer_id?: number;
  /** Buyer first name. */
  payer_first_name?: string;
  /** Buyer last name. */
  payer_last_name?: string;
  /** Saved card identifier used for charges. */
  card_id?: number;
  /** Payment method identifier used for charges. */
  payment_method_id?: number;
  /** Timestamp of the next scheduled charge. */
  next_payment_date?: number;
  /** Timestamp when the subscription was created. */
  date_created?: number;
  /** Timestamp of the last modification. */
  last_modified?: number;
  /** Aggregated charge history. */
  summarized?: SummarizedResponse;
  /** Current subscription status. */
  status?: string;
}
