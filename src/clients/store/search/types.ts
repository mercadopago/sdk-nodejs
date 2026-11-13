/**
 * Request and response types for the store search endpoint.
 *
 * @module store/search/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { StoreResponse } from '../create/types';

export type { StoreResponse };

/** Internal parameters passed to the `search` implementation function. */
export declare type StoreSearchClient = {
	/** ID of the user (seller) whose stores will be listed. */
	userId: number | string;
	/** Optional search/filter criteria sent as query parameters. */
	options?: StoreSearchOptions;
	/** SDK configuration with access token and HTTP options. */
	config: MercadoPagoConfig;
};

/** Public input for {@link Store.search}, accepted by the class facade. */
export declare type StoreSearchData = {
	/** ID of the user (seller) whose stores will be listed. */
	userId: number | string;
	/** Optional search/filter criteria for stores. */
	options?: StoreSearchOptions;
	/** Optional HTTP overrides (timeouts, idempotency key, etc.). */
	requestOptions?: Options;
};

/** Search filters for querying stores. */
export declare interface StoreSearchOptions {
	/** External identifier used when creating the store. */
	external_id?: string;
}

/** Paginated result page returned by the store search endpoint. */
export declare type StoreSearchResultsPage = {
	/** Array of stores matching the search criteria. */
	results: StoreResponse[];
	/** Offset to use for fetching the next page of results. */
	next_offset?: number;
	/** Total number of stores matching the search criteria. */
	total: number;
};
