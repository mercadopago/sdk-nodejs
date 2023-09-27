import { Paging } from '@src/clients/commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerResponse } from '../commonTypes';

export declare type CustomerSearchRequest = {
  filters?: CustomerSearchOptions;
  config: MercadoPagoConfig;
};

export declare type CustomerSearchOptions = {
  email?: string;
};

export declare type CustomerSearchResultsPage = {
  results: CustomerResponse[];
  paging: Paging;
};
