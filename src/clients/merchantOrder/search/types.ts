import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { MerchantOrderResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type MerchantOrderSearchClient = {
  options?: MerchantOrderSearchOptions;
  config: MercadoPagoConfig;
};

export declare type MerchantOrderSearchData = {
  options?: MerchantOrderSearchOptions;
  requestOptions?: Options;
}

export declare interface MerchantOrderSearchOptions extends SearchOptions {
  status?: string;
  preference_id?: string;
  application_id?: string;
  payer_id?: string;
  sponsor_id?: string;
  external_reference?: string;
  site_id?: string;
  marketplace?: string;
  date_created_from?: string;
  date_created_to?: string;
  last_udpated_from?: string;
  last_udpated_to?: string;
  items?: string;
}

export declare type MerchantOrderSearchResultsPage = {
  elements?: MerchantOrderResponse[];
  next_offset?: number;
  total: number;
};
