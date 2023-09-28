import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { InvoicesResponse } from '@src/clients/invoices/commonTypes';
import type { Options, SearchOptions } from '@src/types';

export declare type InvoicesSearchData = {
  filters?: InvoicesSearchOptions;
  requestOptions?: Options;
}

export declare type InvoicesSearchClient = {
  filters?: InvoicesSearchOptions;
  config: MercadoPagoConfig
}

export declare interface InvoicesSearchOptions extends SearchOptions {
  id: number;
  preapproval_id: string;
  payment_id: number;
  payer_id: number;
}

export declare type InvoicesSearchResponse = {
  paging?: Paging;
  results?: Array<InvoicesResponse>;
}
