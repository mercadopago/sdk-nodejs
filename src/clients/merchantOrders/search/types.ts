import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { MerchantOrder } from '../commonTypes';

export declare type MerchantOrderSearchRequest = {
  filters?: MerchantOrderSearchOptions;
  config: MercadoPagoConfig;
};

export declare type MerchantOrderSearchOptions = {
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
  limit?: string;
  offset?: string;
};

export declare type MerchantOrderSearchResultsPage = {
  results: MerchantOrder[];
  paging: Paging;
};

export declare type Paging = {
  total: number;
  offset: number;
  limit: number;
};
