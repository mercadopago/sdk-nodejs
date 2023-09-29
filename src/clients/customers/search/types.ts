import { Paging } from '@src/clients/commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type CustomerSearchClient = {
  filters?: CustomerSearchOptions;
  config: MercadoPagoConfig;
};

export declare type CustomerSearchOptions = {
  email?: string;
};

export declare type CustomerSearchData = {
  filters?: CustomerSearchOptions;
  requestOptions?: Options;
}

export declare type CustomerSearchResultsPage = {
  results?: CustomerResponse[];
  paging?: Paging;
};
