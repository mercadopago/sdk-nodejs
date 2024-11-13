import { Phone } from '@src/clients/commonTypes';
import { Options } from '@src/types';

export declare type CreateOrderData = {
  body: CreateOrderRequest;
  requestOptions?: Options;
}

export declare type CreateOrderRequest = {
  type?: string;
  external_reference?: string;
  transactions?: Transactions;
  payer?: Payer;
  total_amount?: string;
  type_config?: TypeConfig;
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

export declare type Transactions = {
  payments?: Payment[];
}

export declare type Payment = {
  amount?: string;
  automatic_payments?: AutomaticPayments;
  payment_method?: PaymentMethod;
  stored_credential?: StoredCredential;
  subscription_data?: SubscriptionData;
}

export declare type PaymentMethod = {
  id?: string;
  type?: string;
  token?: string;
  installments?: number;
  issuer_id?: string;
  statement_descriptor?: string;
}

export declare type Payer = {
  customer_id?: string;
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
