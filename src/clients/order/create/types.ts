// API version: 5d077b6f-61b2-4b3a-8333-7a64ee547448

import { Phone } from '@src/clients/commonTypes';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';
import { Address, Identification, Item, TypeConfig } from '../commonTypes';

export declare type OrderCreateClient = {
  body: CreateOrderRequest,
  config: MercadoPagoConfig
};

export declare type OrderCreateData = {
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

export declare type TransactionsRequest = {
  payments?: PaymentRequest[];
}

export declare type PaymentRequest = {
  amount?: string;
  automatic_payments?: AutomaticPaymentsRequest;
  payment_method?: PaymentMethodRequest;
  stored_credential?: StoredCredentialRequest;
  subscription_data?: SubscriptionDataRequest;
}

export declare type PaymentMethodRequest = {
  id?: string;
  type?: string;
  token?: string;
  installments?: number;
  issuer_id?: string;
  statement_descriptor?: string;
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

export declare type AutomaticPaymentsRequest = {
  payment_profile_id?: string;
  retries?: number;
  schedule_date?: string;
  due_date?: string;
}

export declare type StoredCredentialRequest = {
  payment_initiator?: string;
  reason?: string;
  store_payment_method?: boolean;
  first_payment?: boolean;
}

export declare type SubscriptionDataRequest = {
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