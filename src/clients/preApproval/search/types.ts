import type { Options, SearchOptions } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { AutoRecurringWithFreeTrial, SummarizedResponse } from '@src/clients/preApproval/commonTypes';

export declare type PreApprovalSearchClient = {
  options?: PreApprovalSearchOptions;
  config: MercadoPagoConfig;
}

export declare type PreApprovalSearchData = {
  options?: PreApprovalSearchOptions;
  requestOptions?: Options;
}

export declare interface PreApprovalSearchOptions extends SearchOptions {
  q?: string;
  payer_id?: number;
  payer_email?: string;
  preapproval_plan_id?: string;
  transaction_amount?: number;
  semaphore?: string;
  status?: string;
  sort?: string;
}

export declare type PreApprovalSearchResponse = {
  paging?: Paging;
  results?: Array<PreApprovalResults>;
}

export declare type PreApprovalResults = {
  id?: string;
  version?: number;
  application_id?: number;
  collector_id?: number;
  preapproval_plan_id?: string;
  reason?: string;
  external_reference?: number;
  back_url?: string;
  init_point?: string;
  auto_recurring?: AutoRecurringWithFreeTrial;
  first_invoice_offset?: number;
  payer_id?: number;
  payer_first_name?: string;
  payer_last_name?: string;
  card_id?: number;
  payment_method_id?: number;
  next_payment_date?: number;
  date_created?: number;
  last_modified?: number;
  summarized?: SummarizedResponse;
  status?: string;
}
