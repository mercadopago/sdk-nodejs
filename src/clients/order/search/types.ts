/**
 * Request, response, and internal-client types for the search orders operation.
 *
 * @module clients/order/search/types
 */

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import { OrderResponse } from '../commonTypes';

/**
 * Public-facing input for {@link Order.search}.
 */
export declare type OrderSearchData = {
	/** Search filters and pagination parameters. */
	options?: OrderSearchRequest;
	/** Per-call request options (timeout, idempotency key, etc.). */
	requestOptions?: Options;
}

/**
 * Internal client payload passed to the search orders REST call.
 */
export declare type OrderSearchClient = {
	/** SDK configuration (access token, default options). */
	config: MercadoPagoConfig;
	/** Search filters and pagination parameters. */
	options?: OrderSearchRequest;
}

/**
 * Query parameters for searching orders.
 *
 * `begin_date` and `end_date` are required; all other fields are
 * optional filters.
 */
export declare type OrderSearchRequest = {
	/** Start of the date range (ISO 8601 format). Required. */
	begin_date: string;
	/** End of the date range (ISO 8601 format). Required. */
	end_date: string;
	/** Filter by integrator-defined external reference. */
	external_reference?: string;
	/** Filter by order type. */
	type?: string;
	/** Filter by order status. */
	status?: string;
	/** Filter by granular status detail. */
	status_detail?: string;
	/** Filter by payment method identifier (e.g. `visa`). */
	payment_method_id?: string;
	/** Filter by payment method type (e.g. `credit_card`). */
	payment_method_type?: string;
	/** Page number for pagination (1-based). */
	page?: number;
	/** Number of results per page. */
	page_size?: number;
	/** Field to sort results by (e.g. `created_date`). */
	sort_by?: string;
	/** Sort direction: `asc` or `desc`. */
	sort_order?: string;
}

/**
 * Paginated response returned by the search orders endpoint.
 */
export declare type OrderSearchResponse = {
	/** List of orders matching the search criteria. */
	data?: OrderResponse[];
	/** Pagination metadata for the result set. */
	paging?: PagingResponse;
}

/**
 * Pagination metadata for order search results.
 */
export declare type PagingResponse = {
	/** Total number of matching orders. */
	total?: string;
	/** Total number of pages available. */
	total_pages?: string;
	/** Current page offset. */
	offset?: string;
	/** Maximum results per page. */
	limit?: string;
}
