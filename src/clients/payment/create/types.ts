import type { Address, Items, Shipments } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Identification, Payer, Phone } from '../commonTypes';
import type { Options } from '@src/types';

export declare type PaymentCreateClient = {
  body: PaymentCreateRequest,
  config: MercadoPagoConfig
};

export declare type PaymentCreateData = {
  body: PaymentCreateRequest;
  requestOptions?: Options;
}

export declare type PaymentCreateRequest = {
  additional_info?: AdditionalInfo,
  application_fee?: string,
  binary_mode?: boolean,
  callback_url?: string,
  campaign_id?: string,
  capture?: boolean,
  coupon_amount?: number,
  coupon_code?: string,
  date_of_expiration?: string,
  description?: string,
  differential_pricing_id?: number,
  external_reference?: string,
  installments?: number,
  issuer_id?: number,
  metadata?: any,
  notification_url?: string,
  payment_method_id?: string,
  statement_descriptor?: string,
  token?: string,
  transaction_amount?: number,
  payer?: PayerRequest,
  forward_data?:ForwardDataRequest,
  point_of_interaction?: PointOfInteractionRequest,
  sponsor_id?: number,
  transaction_details?: TransactionDetailsRequest
};

export declare type PayerRequest = {
  type?: string,
  id?: string,
  email?: string,
  identification?: Identification,
  phone?: Phone,
  first_name?: string,
  last_name?: string,
  entity_type?: string,
  address?: AddressRequest,
}

export declare type ForwardDataRequest = {
  sub_merchant?: SubMerchant,
}

export declare interface AddressRequest extends Address {
  neighborhood?: string,
  city?: string,
  federal_unit?: string,
}

export declare type SubMerchant = {
    sub_merchant_id?: string;
    mcc?: string;
    country?: string;
    address_door_number?: number;
    zip?: string;
    document_number?: string;
    city?: string;
    address_street?: string;
    business_name?: string;
    region_code_iso?: string;
    region_code?: string;
    document_type?: string;
    phone?: string;
    url?: string;
}

export declare type PointOfInteractionRequest = {
  linkedTo?: string,
  type?: string,
  transaction_data?: TransactionDataRequest,
};

export declare type TransactionDataRequest = {
  first_time_use?: boolean,
  subscription_sequence?: SubscriptionSequenceRequest,
  subscription_id?: string,
  invoice_period?: InvoicePeriodRequest,
  payment_reference?: PaymentReferenceRequest,
  billing_date?: string,
};

export declare type SubscriptionSequenceRequest = {
  number?: number,
  total?: number,
};

export declare type InvoicePeriodRequest = {
  period?: number;
  type?: string;
};

export declare type PaymentReferenceRequest = {
  id?: string;
};

export declare type AdditionalInfo = {
  ip_address?: string,
  items?: Array<Items>,
  payer?: Payer,
  shipments?: Shipments,
};

export declare type TransactionDetailsRequest = {
  financial_institution?: string,
};

