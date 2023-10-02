import { Paging } from '@src/clients/commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SearchOptions } from '@src/types';
import type { CustomerResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type CustomerSearchClient = {
  options?: CustomerSearchOptions;
  config: MercadoPagoConfig;
};

export declare interface CustomerSearchOptions extends SearchOptions {
  email?: string;
}

export declare type CustomerSearchData = {
  options?: CustomerSearchOptions;
  requestOptions?: Options;
}

export declare type CustomerSearchResultsPage = {
  results?: CustomerResponse[];
  paging?: Paging;
};
