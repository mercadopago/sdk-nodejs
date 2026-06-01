/**
 * Request types for the search advanced-payments operation.
 *
 * @module advancedPayment/search/types
 */
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { AdvancedPaymentResponse } from '../commonTypes';
import type { Options, SearchOptions } from '@src/types';

export declare interface AdvancedPaymentSearchOptions extends SearchOptions {
  status?: string;
  external_reference?: string;
  offset?: number;
  limit?: number;
}

export declare type AdvancedPaymentSearchData = {
  options?: AdvancedPaymentSearchOptions;
  requestOptions?: Options;
};

export declare type AdvancedPaymentSearchClient = {
  options?: AdvancedPaymentSearchOptions;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentSearchResponse = {
  paging?: Paging;
  results?: Array<AdvancedPaymentResponse>;
};
