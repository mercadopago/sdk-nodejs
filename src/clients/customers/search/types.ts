import { Paging } from '@src/clients/commonTypes';
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
