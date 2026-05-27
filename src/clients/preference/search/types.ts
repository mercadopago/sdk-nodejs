/**
 * Types for the "search preferences" operation.
 *
 * Defines the query filters, paginated response envelope, and the
 * summary element returned for each matching preference.
 *
 * @module clients/preference/search/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';

/**
 * Internal payload passed to the search REST call.
 */
export declare type PreferenceSearchClient = {
  /** Optional query-string filters. */
  options?: PreferenceSearchOptions,
  /** SDK configuration (access token, options). */
  config: MercadoPagoConfig
};

/**
 * Paginated response returned by the preference search endpoint.
 */
export declare type PreferenceSearchResponse = {
  /** List of preference summaries matching the query. */
  elements?: Array<Elements>
  /** Offset to use for fetching the next page of results. */
  next_offset?: number;
  /** Total number of preferences matching the query. */
  total?: number;
};

/**
 * Summary representation of a preference in search results.
 *
 * Contains only the most commonly needed fields; use
 * {@link Preference.get} to retrieve the full resource.
 */
export declare type Elements = {
  /** Unique preference identifier. */
  id: string;
  /** OAuth application (client) identifier that created the preference. */
  client_id: string;
  /** MercadoPago seller (collector) account identifier. */
  collector_id: number;
  /** Internal concept identifier. */
  concept_id: number;
  /** Corporation identifier for multi-account setups. */
  corporation_id: string;
  /** ISO 8601 timestamp when the preference was created. */
  date_created: string;
  /** ISO 8601 start of the preference activation window. */
  expiration_date_from: string;
  /** ISO 8601 end of the preference activation window. */
  expiration_date_to: string;
  /** Whether the preference has an expiration window. */
  expires: boolean;
  /** Integrator-defined external reference. */
  external_reference: string;
  /** Certified integrator identifier. */
  integrator_id: string;
  /** Item identifiers included in the preference. */
  items: Array<string>;
  /** ISO 8601 timestamp of the last update. */
  last_updated: string;
  /** Whether the preference was created with a production access token. */
  live_mode: boolean;
  /** Marketplace identifier. */
  marketplace: string;
  /** Operation type (e.g. `regular_payment`). */
  operation_type: string;
  /** Buyer email address. */
  payer_email: string;
  /** Buyer MercadoPago account identifier. */
  payer_id: number;
  /** Platform identifier. */
  platform_id: string;
  /** Processing modes (e.g. `aggregator`, `gateway`). */
  processing_modes: Array<string>;
  /** Product identifier. */
  product_id: string;
  /** Preference purpose (e.g. `wallet_purchase`). */
  purpose: string;
  /** MercadoPago site (country) identifier (e.g. `MLA`, `MLB`). */
  site_id: string;
  /** Sponsor (marketplace seller) account identifier. */
  sponsor_id: number;
  /** Shipping mode configured for the preference. */
  shipping_mode: string;
}

/**
 * Query-string filters for the preference search endpoint.
 *
 * Extends the common {@link SearchOptions} (limit, offset) with
 * preference-specific filters.
 */
export declare interface PreferenceSearchOptions extends SearchOptions {
  /** Filter by sponsor (marketplace seller) identifier. */
  sponsor_id?: string;
  /** Filter by integrator-defined external reference. */
  external_reference?: string;
  /** Filter by MercadoPago site (country) identifier. */
  site_id?: string;
  /** Filter by marketplace identifier. */
  marketplace?: string;
}

/**
 * Public-facing input for {@link Preference.search}.
 */
export declare type PreferenceSearchData = {
  /** Optional query-string filters. */
  options?: PreferenceSearchOptions;
  /** Per-request option overrides (timeout, idempotency key, etc.). */
  requestOptions?: Options;
}
