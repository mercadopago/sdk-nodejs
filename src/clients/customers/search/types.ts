import { Paging } from '@src/clients/commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { CustomerResponse } from '../commonTypes';

export declare type CustomerSearchRequest = {
  filters?: CustomerSearchOptions;
  config: MercadoPagoConfig;
};

export declare interface CustomerSearchOptions extends SearchOptions {
  email?: string;
}

export declare type CustomerSearchResultsPage = {
  results: CustomerResponse[];
  paging: Paging;
};
