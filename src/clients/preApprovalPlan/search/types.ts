/**
 * Types for the "search subscription plans" operation.
 *
 * Defines the query filters, paginated response envelope, and the
 * paging metadata returned for matching plans.
 *
 * @module clients/preApprovalPlan/search/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { PreApprovalPlanResponse } from '../commonTypes';
import type { Options } from '@src/types';

/**
 * Internal payload passed to the search REST call.
 */
export declare type PreApprovalPlanSearchClient = {
  /** Optional query-string filters. */
  options?: PreApprovalPlanSearchOptions,
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Query-string filters for the subscription plan search endpoint.
 *
 * Extends the common {@link SearchOptions} (limit, offset) with
 * plan-specific filters.
 */
export declare interface PreApprovalPlanSearchOptions extends SearchOptions {
  /** Filter by plan status (`active`, `inactive`). */
  status?: string;
  /** Free-text search query. */
  q?: string;
  /** Field name to sort results by. */
  sort?: string;
  /** Sort direction (`asc` or `desc`). */
  criteria?: string;
}

/**
 * Paginated response returned by the subscription plan search endpoint.
 */
export declare type PreApprovalPlanSearchResponse = {
  /** Pagination metadata. */
  paging?: PreApprovalPlanSearchPaging;
  /** List of plans matching the query. */
  results?: Array<PreApprovalPlanResponse>;
};

/**
 * Pagination metadata for plan search results.
 */
export declare type PreApprovalPlanSearchPaging = {
  /** Total number of plans matching the query. */
  total: number;
  /** Maximum number of results returned per page. */
  limit: number;
  /** Current zero-based offset within the result set. */
  offset: number;
};

/**
 * Public-facing input for {@link PreApprovalPlan.search}.
 */
export declare type PreApprovalPlanSearchData = {
  /** Optional query-string filters. */
  options?: PreApprovalPlanSearchOptions;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}
