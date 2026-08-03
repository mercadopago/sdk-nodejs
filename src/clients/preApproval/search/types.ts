/**
 * Types for the "search subscriptions" operation.
 *
 * Defines the query filters, paginated response envelope, and the
 * individual subscription result record.
 *
 * @module clients/preApproval/search/types
 */

import type { Options, SearchOptions } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { AutoRecurringWithFreeTrial, SummarizedResponse } from '@src/clients/preApproval/commonTypes';

/**
 * Internal payload passed to the search REST call.
 */
export declare type PreApprovalSearchClient = {
  /** Optional query-string filters. */
  options?: PreApprovalSearchOptions;
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig;
}

/**
 * Public-facing input for {@link PreApproval.search}.
 */
export declare type PreApprovalSearchData = {
  /** Optional query-string filters. */
  options?: PreApprovalSearchOptions;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}

/**
 * Query-string filters for the subscription search endpoint.
 *
 * Extends the common {@link SearchOptions} (limit, offset) with
 * subscription-specific filters.
 */
export declare interface PreApprovalSearchOptions extends SearchOptions {
  /** Free-text search query. */
  q?: string;
  /** Filter by buyer MercadoPago account identifier. */
  payer_id?: number;
  /** Filter by buyer email address. */
  payer_email?: string;
  /** Filter by the associated subscription plan identifier. */
  preapproval_plan_id?: string;
  /** Filter by recurring charge amount. */
  transaction_amount?: number;
  /** Filter by health semaphore (`green`, `yellow`, `red`). */
  semaphore?: string;
  /** Filter by subscription status (e.g. `authorized`, `paused`, `cancelled`). */
  status?: string;
  /** Field name to sort results by. */
  sort?: string;
}

/**
 * Paginated response returned by the subscription search endpoint.
 */
export declare type PreApprovalSearchResponse = {
  /** Pagination metadata (total, offset, limit). */
  paging?: Paging;
  /** List of subscriptions matching the query. */
  results?: Array<PreApprovalResults>;
}

/**
 * Individual subscription record returned in search results.
 */
export declare type PreApprovalResults = {
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
  /** Human-readable reason shown to the buyer. */
  reason?: string;
  /** Integrator-defined external reference. */
  external_reference?: number;
  /** URL the buyer returns to after authorization. */
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
