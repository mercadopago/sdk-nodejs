/**
 * Request and response types for searching merchant orders.
 *
 * @module merchantOrder/search/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { MerchantOrderResponse } from '../commonTypes';
import type { Options } from '@src/types';

/** Internal parameters passed to the `search` implementation function. */
export declare type MerchantOrderSearchClient = {
  /** Optional search/filter criteria sent as query parameters. */
  options?: MerchantOrderSearchOptions;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/** Public input for {@link MerchantOrder.search}, accepted by the class facade. */
export declare type MerchantOrderSearchData = {
  /** Optional search/filter criteria for merchant orders. */
  options?: MerchantOrderSearchOptions;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Search filters for querying merchant orders. */
export declare interface MerchantOrderSearchOptions extends SearchOptions {
  /** Filter by order status (e.g. `opened`, `closed`). */
  status?: string;
  /** Filter by the originating checkout preference ID. */
  preference_id?: string;
  /** Filter by the application ID that created the order. */
  application_id?: string;
  /** Filter by buyer's MercadoPago user ID. */
  payer_id?: string;
  /** Filter by sponsor (marketplace) ID. */
  sponsor_id?: string;
  /** Filter by the integrator's external reference. */
  external_reference?: string;
  /** Filter by MercadoPago site (e.g. `MLA`, `MLB`). */
  site_id?: string;
  /** Filter by marketplace identifier. */
  marketplace?: string;
  /** Start of the creation date range (ISO 8601). */
  date_created_from?: string;
  /** End of the creation date range (ISO 8601). */
  date_created_to?: string;
  /** Start of the last-updated date range (ISO 8601). */
  last_udpated_from?: string;
  /** End of the last-updated date range (ISO 8601). */
  last_udpated_to?: string;
  /** Filter by item identifiers (comma-separated). */
  items?: string;
}

/** Paginated result page returned by the merchant order search endpoint. */
export declare type MerchantOrderSearchResultsPage = {
  /** Array of merchant orders matching the search criteria. */
  elements?: MerchantOrderResponse[];
  /** Offset to use for fetching the next page of results. */
  next_offset?: number;
  /** Total number of orders matching the search criteria. */
  total: number;
};
