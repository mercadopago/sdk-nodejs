import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Customer } from '../commonTypes';

export declare type CustomerSearchRequest = {
  filters?: CustomerSearchOptions;
  config: MercadoPagoConfig;
};

export declare type CustomerSearchOptions = {
  email?: string;
};

export declare type CustomerSearchResultsPage = {
  results: Customer[];
  paging: Paging;
};

export declare type Paging = {
  total: number;
  offset: number;
  limit: number;
};