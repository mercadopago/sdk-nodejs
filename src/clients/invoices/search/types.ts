import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { InvoicesResponse } from '@src/clients/invoices/commonTypes';
import type { Options } from '@src/types';

export declare type InvoicesSearchRequest = {
  filters?: InvoicesSearchOptions;
  requestOptions?: Options;
}

export declare type InvoicesSearch = {
  filters?: InvoicesSearchOptions;
  config: MercadoPagoConfig
}

export declare type InvoicesSearchOptions = {
  id: number;
  preapproval_id: string;
  payment_id: number;
  payer_id: number;
  offset?: number;
  limit?: number;
}

export declare type InvoicesSearchResponse = {
  paging?: Paging;
  results?: Array<InvoicesResponse>;
}
