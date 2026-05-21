/**
 * Request, option, and response types for the customer search operation.
 *
 * @module clients/customer/search/types
 */

import { Paging } from '@src/clients/commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { CustomerResponse } from '../commonTypes';
import type { Options } from '@src/types';

/**
 * Internal payload forwarded to the `search` REST implementation.
 */
export declare type CustomerSearchClient = {
  /** Optional search filters and pagination parameters. */
  options?: CustomerSearchOptions;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Query parameters accepted by the customer search endpoint.
 *
 * Extends the generic {@link SearchOptions} with customer-specific
 * filters such as email.
 */
export declare interface CustomerSearchOptions extends SearchOptions {
  /** Filter customers by exact email address. */
  email?: string;
}

/**
 * Public-facing input for {@link Customer.search}.
 */
export declare type CustomerSearchData = {
  /** Optional search filters and pagination parameters. */
  options?: CustomerSearchOptions;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
}

/**
 * Paginated page of customer search results returned by the API.
 */
export declare type CustomerSearchResultsPage = {
  /** Customer records matching the search criteria. */
  results?: CustomerResponse[];
  /** Pagination metadata for the result set. */
  paging?: Paging;
};
