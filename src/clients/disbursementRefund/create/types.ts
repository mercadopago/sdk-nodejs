import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { DisbursementRefundResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type DisbursementRefundCreateRequest = {
  amount?: number;
};

export declare type DisbursementRefundCreateClient = {
  advancedPaymentId: string;
  disbursementId: string;
  body: DisbursementRefundCreateRequest;
  config: MercadoPagoConfig;
};

export declare type DisbursementRefundCreateData = {
  advancedPaymentId: string;
  disbursementId: string;
  body: DisbursementRefundCreateRequest;
  requestOptions?: Options;
};

export { DisbursementRefundResponse };
