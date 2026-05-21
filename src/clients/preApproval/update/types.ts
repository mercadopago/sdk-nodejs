import type { Options } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { SummarizedResponse, AutoRecurringWithFreeTrial } from '@src/clients/preApproval/commonTypes';

export declare type PreApprovalUpdateClient = {
  id: string;
  body: updatePreApprovalRequest;
  config: MercadoPagoConfig;
}

export declare type updatePreApprovalRequest = {
  auto_recurring?: AutoRecurringRequest;
  back_url?: string;
  card_token_id?: string;
  external_reference?: string;
  payer_email?: string;
  reason?: string;
  status?: string;
}

export declare type AutoRecurringRequest = {
  transaction_amount: number;
  currency_id: string;
}

export declare type PreApprovalUpdateData = {
  id: string;
  body: updatePreApprovalRequest;
  requestOptions?: Options;
}

export declare type PreApprovalUpdateResponse = {
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
