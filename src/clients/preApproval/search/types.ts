import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Paging } from '@src/clients/commonTypes';
import type { AutoRecurringRequest } from '@src/clients/preApproval/commonTypes';

export declare type Search = {
  filters?: PreApprovalSearchOptions;
  config: MercadoPagoConfig
}

export declare type PreApprovalSearchOptions = {
  q?: string;
  payer_id?: number;
  payer_email?: string;
  preapproval_plan_id?: string;
  transaction_amount?: number;
  semaphore?: string;
  status?: string;
  sort?: string;
  offset?: string;
  limit?: string;
}

export declare type PreApprovalSearchResponse = {
  paging: Paging;
  results: Array<PreApprovalResults>;
}

export declare type PreApprovalResults = {
  id: string;
  version: number;
  application_id: number;
  collector_id: number;
  preapproval_plan_id: string;
  reason: string;
  external_reference: number;
  back_url: string;
  init_point: string;
  auto_recurring: PreApprovalAutoRecurring;
  first_invoice_offset: number;
  payer_id: number;
  payer_first_name: string;
  payer_last_name: string;
  card_id: number;
  payment_method_id: number;
  next_payment_date: number;
  date_created: number;
  last_modified: number;
  summarized: PreApprovalSummarized;
  status: string;
}

export declare type PreApprovalFreeTrial = {
  frequency: number;
  frequency_type: string;
}

export declare type PreApprovalSummarized = {
  quotas: number;
  charged_quantity: number;
  charged_amount: number;
  pending_charge_quantity: number;
  pending_charge_amount: number;
  last_charged_date: string;
  last_charged_amount: number;
  semaphore: string;
}

export declare interface PreApprovalAutoRecurring extends AutoRecurringRequest {
  free_trial: PreApprovalFreeTrial;
}
