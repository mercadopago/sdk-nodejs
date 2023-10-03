import type { Items, Shipments } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Payer } from '../commonTypes';
import type { Options } from '@src/types';

export declare type PaymentCreateClient = {
  body: PaymentCreateRequest,
  config: MercadoPagoConfig
};

export declare type qqrcoisatest = {
  body: PaymentCreateRequest,
};

export declare type PaymentCreateData = {
  body: PaymentCreateRequest;
  requestOptions?: Options;
}

export declare type PaymentCreateRequest = {
  additional_info?: additionalInfo,
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
  payer?: Payer,
};

export declare type additionalInfo = {
  ip_address?: string,
  items?: Array<Items>,
  payer?: Payer,
  shipments?: Shipments,
};

