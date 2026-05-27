/**
 * Request and response types for searching subscription invoices.
 *
 * @module invoice/search/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { InvoiceResponse } from '@src/clients/invoice/commonTypes';
import type { Options, SearchOptions } from '@src/types';

/** Public input for {@link Invoice.search}, accepted by the class facade. */
export declare type InvoiceSearchData = {
  /** Optional search/filter criteria for invoices. */
  options?: InvoiceSearchOptions;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Internal parameters passed to the `search` implementation function. */
export declare type InvoiceSearchClient = {
  /** Optional search/filter criteria sent as query parameters. */
  options?: InvoiceSearchOptions;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig
}

/** Search filters for querying subscription invoices. */
export declare interface InvoiceSearchOptions extends SearchOptions {
  /** Filter by invoice ID. */
  id?: number;
  /** Filter by the preapproval (subscription plan) identifier. */
  preapproval_id?: string;
  /** Filter by the associated payment identifier. */
  payment_id?: number;
  /** Filter by the subscriber's MercadoPago user ID. */
  payer_id?: number;
  /** Number of results to skip (for pagination). */
  offset?: number;
  /** Maximum number of results to return per page. */
  limit?: number;
}

/** Paginated response returned by the invoice search endpoint. */
export declare type InvoiceSearchResponse = {
  /** Pagination metadata for the result set. */
  paging?: Paging;
  /** Array of invoices matching the search criteria. */
  results?: Array<InvoiceResponse>;
}
