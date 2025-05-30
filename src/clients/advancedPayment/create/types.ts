import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { AdvancedPaymentDisbursement, AdvancedPaymentPayment } from '../commonTypes';
import type { Payer, AdditionalInfo } from '@src/clients/payment/commonTypes';

export declare type AdvancedPaymentCreateClient = {
  body: AdvancedPaymentCreateRequest,
  config: MercadoPagoConfig
};

export declare type AdvancedPaymentCreateData = {
  body: AdvancedPaymentCreateRequest;
  requestOptions?: Options;
}

export declare type AdvancedPaymentCreateRequest = {
  application_id?: string;
  payments?: Array<AdvancedPaymentPayment>;
  disbursements?: Array<AdvancedPaymentDisbursement>;
  payer?: Payer;
  external_reference?: string;
  description?: string;
  binary_mode?: boolean;
  capture?: boolean;
  additional_info?: AdditionalInfo;
  metadata?: Record<string, any>;
}; 