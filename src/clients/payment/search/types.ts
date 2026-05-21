import type { Identification } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, SearchOptions } from '@src/types';

export declare type PaymentSearchClient = {
  options?: PaymentSearchOptions,
  config: MercadoPagoConfig
};

export declare type PaymentSearch = {
  paging?: PaymentSearchPaging;
  results?: Array<PaymentSearchResult>;
};

export declare type PaymentSearchResult = {
  id?: string;
  date_created?: string;
  date_approved?: string;
  date_last_updated?: string;
  date_of_expiration?: string;
  money_release_date?: string;
  operation_type?: string;
  issuer_id?: string;
  payment_method_id?: string;
  payment_type_id?: string;
  status?: string;
  status_detail?: string;
  currency_id?: string;
  description?: string;
  live_mode?: boolean;
  sponsor_id?: string;
  authorization_code?: string;
  money_release_schema?: string;
  counter_currency?: string;
  collector_id?: string;
  payer?: Payer;
  metadata?: any;
  additional_info?: any;
  external_reference?: string;
  transaction_amount?: number;
  transaction_amount_refunded?: number;
  coupon_amount?: number;
  differential_pricing_id?: string;
  deduction_schema?: string;
  transaction_details?: TransactionDetails;
  captured?: boolean;
  binary_mode?: boolean;
  call_for_authorize_id?: string;
  statement_descriptor?: string;
  installments?: number;
  card?: any;
  notification_url?: string;
  processing_mode?: string;
  merchant_account_id?: string;
  acquirer?: string;
  merchant_number?: string;
};

export declare type Payer = {
  id: string;
  email: string;
  identification: Identification;
  type: string;
};

export declare type TransactionDetails = {
  net_received_amount: number;
  total_paid_amount: number;
  overpaid_amount: number;
  external_resource_url: string;
  installment_amount: number;
  financial_institution: string;
  payment_method_reference_id: string;
  payable_deferral_period: string;
  acquirer_reference: string;
  transaction_id?: string;
};

export declare type PaymentSearchPaging = {
  total: number;
  limit: number;
  offset: number;
};

export declare interface PaymentSearchOptions extends SearchOptions {
  sort?: 'date_approved' | 'date_created' | 'date_last_updated' | 'money_release_date';
  criteria?: 'asc' | 'desc';
  external_reference?: string;
  range?: 'date_created' | 'date_last_updated' | 'date_approved' | 'money_release_date' | 'date_created';
  begin_date?: string;
  end_date?: string;
}

export declare type PaymentSearchData = {
  options?: PaymentSearchOptions;
  requestOptions?: Options;
}