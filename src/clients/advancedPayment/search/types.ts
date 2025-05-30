import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { AdvancedPaymentResponse } from '../commonTypes';

export declare type AdvancedPaymentSearchClient = {
  options?: AdvancedPaymentSearchOptions;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentSearchData = {
  options?: AdvancedPaymentSearchOptions;
  requestOptions?: Options;
};

export declare type AdvancedPaymentSearchOptions = {
  status?: string;
  external_reference?: string;
  begin_date?: string;
  end_date?: string;
  sort?: string;
  criteria?: string;
  range?: string;
  offset?: number;
  limit?: number;
};

export declare type AdvancedPaymentSearch = {
  paging?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
  results?: Array<AdvancedPaymentResponse>;
}; 