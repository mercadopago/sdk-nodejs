import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { DisbursementRefundResponse } from '../commonTypes';
import type { Options } from '@src/types';

export declare type DisbursementRefundCreateAllRequest = {
  amount?: number;
};

export declare type DisbursementRefundCreateAllClient = {
  advancedPaymentId: string;
  body: DisbursementRefundCreateAllRequest;
  config: MercadoPagoConfig;
};

export declare type DisbursementRefundCreateAllData = {
  advancedPaymentId: string;
  body: DisbursementRefundCreateAllRequest;
  requestOptions?: Options;
};

export { DisbursementRefundResponse };
