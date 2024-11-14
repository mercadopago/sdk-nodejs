// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

import { Phone } from '@src/clients/commonTypes';
import { ApiResponse, Options } from '@src/types';

export declare type CreateOrderData = {
  body: CreateOrderRequest;
  requestOptions?: Options;
}

export declare type CreateOrderRequest = {
  type?: string;
  external_reference?: string;
  transactions?: TransactionsRequest;
  payer?: PayerRequest;
  total_amount?: string;
  type_config?: TypeConfig;
  processing_mode?: string;
  description?: string;
  marketplace?: string;
  marketplace_fee?: string;
  items?: Item[];
  expiration_time?: string;
}

export declare interface OrderResponse extends ApiResponse {
  id?: string;
  type?: string;
  external_reference?: string;
  site_id?: string;
  created_date?: string;
  last_updated_date?: string;
  status?: string;
  status_detail?: string;
  transactions?: TransactionsResponse;
  payer?: PayerResponse;
  type_config?: TypeConfig;
  total_amount?: string;
  processing_mode?: string;
  description?: string;
  marketplace?: string;
  marketplace_fee?: string;
  items?: Item[];
  expiration_time?: string;
}

export declare type TypeConfig = {
  capture_mode?: string;
}

export declare type TransactionsRequest = {
  payments?: PaymentRequest[];
}

export declare type TransactionsResponse = {
  payments?: PaymentResponse[];
  refunds?: Refund[];
}

export declare type PaymentRequest = {
  amount?: string;
  automatic_payments?: AutomaticPayments;
  payment_method?: PaymentMethodRequest;
  stored_credential?: StoredCredential;
  subscription_data?: SubscriptionData;
}

export declare type PaymentResponse = {
  id?: string;
  reference_id?: string;
  amount?: string;
  status?: string;
  status_detail?: string;
  payment_method?: PaymentMethodResponse;
}

export declare type Refund = {
  id?: string;
  transaction_id?: string;
  reference_id?: string;
  amount?: string;
  status?: string;
}

export declare type PaymentMethodRequest = {
  id?: string;
  type?: string;
  token?: string;
  installments?: number;
  issuer_id?: string;
  statement_descriptor?: string;
}

export declare type PaymentMethodResponse = {
  id?: string;
  type?: string;
  card_id?: string;
  token?: string;
  installments?: number;
  issuer_id?: string;
  statement_descriptor?: string;
  external_resource_url?: string;
  barcode_content?: string;
  reference?: string;
  verification_code?: string;
  financial_institution?: string;
}

export declare type PayerRequest = {
  customer_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  identification?: Identification;
  phone?: Phone;
  address?: Address;
}

export declare type PayerResponse = {
  email?: string;
  first_name?: string;
  last_name?: string;
  identification?: Identification;
  phone?: Phone;
  address?: Address;
}

export declare type Identification = {
  type?: string;
  number?: string;
}

export declare type Address = {
  street_name?: string;
  street_number?: string;
}

export declare type Item = {
  title?: string;
  unit_price?: string;
  quantity?: number;
  id?: string;
  category_id?: string;
  description?: string;
  picture_url?: string;
}

export declare type AutomaticPayments = {
  payment_profile_id?: string;
  retries?: number;
  schedule_date?: string;
  due_date?: string;
}

export declare type StoredCredential = {
  payment_initiator?: string;
  reason?: string;
  store_payment_method?: boolean;
  first_payment?: boolean;
}

export declare type SubscriptionData = {
  subscription_sequence?: SubscriptionSequence;
  invoice_id?: string;
  invoice_period?: InvoicePeriod;
  billing_date?: string;
}

export declare type SubscriptionSequence = {
  number?: number;
  total?: number;
}

export declare type InvoicePeriod = {
  type?: string;
  period?: number;
}
