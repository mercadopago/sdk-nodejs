/**
 * Shared request and response types for the Subscription (PreApproval) client.
 *
 * These types model the JSON payloads accepted and returned by the
 * `/preapproval` API endpoints. They describe auto-recurring billing
 * schedules, free-trial periods, summarized charge history, and the
 * full subscription response.
 *
 * @module clients/preApproval/commonTypes
 */

import { ApiResponse } from '@src/types';

/**
 * Recurring billing schedule attached to a subscription request.
 *
 * Defines how often and how much the buyer is charged.
 */
export declare type AutoRecurringRequest = {
  /** Number of `frequency_type` units between each charge (e.g. `1`). */
  frequency: number;
  /** Time unit for the billing cycle (`days` or `months`). */
  frequency_type: string;
  /** ISO 8601 date when the first charge should occur. */
  start_date?: string;
  /** ISO 8601 date when the subscription should stop recurring. */
  end_date?: string;
  /** Amount charged per billing cycle in the specified currency. */
  transaction_amount?: number;
  /** ISO 4217 currency code (e.g. `ARS`, `BRL`). */
  currency_id: string;
}

/**
 * Auto-recurring schedule that may include a free-trial period.
 */
export declare interface AutoRecurringWithFreeTrial extends AutoRecurringRequest {
  /** Optional free-trial period before charges begin. */
  free_trial?: FreeTrial;
}

/**
 * Free-trial configuration preceding the first charge.
 */
export declare type FreeTrial = {
  /** Number of `frequency_type` units the trial lasts. */
  frequency: number;
  /** Time unit for the trial duration (`days` or `months`). */
  frequency_type: string;
}

/**
 * Auto-recurring schedule as returned by the API.
 */
export declare interface AutoRecurringResponse extends ApiResponse {
  /** Number of `frequency_type` units between each charge. */
  frequency?: number;
  /** Time unit for the billing cycle. */
  frequency_type?: string;
  /** Amount charged per billing cycle. */
  transaction_amount?: number;
  /** ISO 4217 currency code. */
  currency_id?: string;
  /** Free-trial descriptor, or `null` if no trial is configured. */
  free_trial?: string | null;
}

/**
 * Request body for creating a new subscription (pre-approval).
 */
export declare type PreApprovalRequest = {
  /** Recurring billing schedule for the subscription. */
  auto_recurring?: AutoRecurringRequest;
  /** URL the buyer returns to after authorizing the subscription. */
  back_url?: string;
  /** Tokenised card identifier to use for recurring charges. */
  card_token_id?: string;
  /** Integrator-defined reference to correlate with internal systems. */
  external_reference?: string;
  /** Buyer email address used for identification and notifications. */
  payer_email?: string;
  /** Subscription plan template identifier this subscription belongs to. */
  preapproval_plan_id?: string;
  /** Human-readable reason or description shown to the buyer. */
  reason?: string;
  /** Desired subscription status (e.g. `authorized`, `paused`, `cancelled`). */
  status?: string;
}

/**
 * Aggregated charge history for a subscription.
 *
 * Provides a snapshot of how much has been collected, how many
 * charges succeeded, and what is still pending.
 */
export declare interface SummarizedResponse extends ApiResponse {
  /** Total amount successfully charged so far. */
  charged_amount?: number | null,
  /** Number of successful charges. */
  charged_quantity?: number | null,
  /** Amount of the most recent charge. */
  last_charged_amount?: string | null
  /** ISO 8601 date of the most recent successful charge. */
  last_charged_date?: string | null,
  /** Amount pending collection. */
  pending_charge_amount?: number | null,
  /** Number of charges still pending. */
  pending_charge_quantity?: number | null,
  /** Remaining quota information. */
  quotas?: string | null,
  /** Health indicator for the subscription (`green`, `yellow`, `red`). */
  semaphore?: string | null,
}

/**
 * API response returned when creating, retrieving, or updating a subscription.
 *
 * Extends the standard {@link ApiResponse} envelope with all subscription
 * fields plus server-generated values such as `id`, `init_point`, and
 * `date_created`.
 */
export declare interface PreApprovalResponse extends ApiResponse {
  /** Unique subscription identifier assigned by MercadoPago. */
  id?: string;
  /** Buyer's MercadoPago account identifier. */
  payer_id?: number;
  /** Buyer email address. */
  payer_email?: string;
  /** Seller (collector) MercadoPago account identifier. */
  collector_id?: number;
  /** OAuth application identifier that created this subscription. */
  application_id?: number;
  /** Current subscription status (e.g. `authorized`, `paused`, `cancelled`). */
  status?: string;
  /** Human-readable subscription reason shown to the buyer. */
  reason?: string;
  /** Integrator-defined external reference. */
  external_reference?: string;
  /** ISO 8601 timestamp when the subscription was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified?: string;
  /** URL to redirect the buyer to authorize the subscription. */
  init_point?: string;
  /** Recurring billing schedule details. */
  auto_recurring?: AutoRecurringResponse;
  /** Aggregated charge history for the subscription. */
  summarized?: SummarizedResponse;
  /** Payment method identifier used for charges, or `null` if not yet set. */
  payment_method_id?: string | null;
  /** Offset (in days) before the first invoice is generated, or `null`. */
  first_invoice_offset?: string | null;
  /** URL the buyer returns to after authorizing the subscription. */
  back_url?: string;
  /** ISO 8601 date of the next scheduled charge. */
  next_payment_date?: string;
}
