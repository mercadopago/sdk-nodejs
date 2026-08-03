import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { ChargebackResponse } from '../commonTypes';
import type { Options, SearchOptions } from '@src/types';

export declare interface ChargebackSearchOptions extends SearchOptions {
  payment_id?: number;
  status?: string;
  offset?: number;
  limit?: number;
}

export declare type ChargebackSearchData = {
  options?: ChargebackSearchOptions;
  requestOptions?: Options;
};

export declare type ChargebackSearchClient = {
  options?: ChargebackSearchOptions;
  config: MercadoPagoConfig;
};

export declare type ChargebackSearchResponse = {
  paging?: Paging;
  results?: Array<ChargebackResponse>;
};
