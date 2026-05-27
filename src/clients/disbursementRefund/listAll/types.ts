import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { DisbursementRefundResponse } from '../commonTypes';
import type { Options } from '@src/types';

export { DisbursementRefundResponse };

export declare type DisbursementRefundListAllClient = {
  advancedPaymentId: string;
  config: MercadoPagoConfig;
};

export declare type DisbursementRefundListAllData = {
  advancedPaymentId: string;
  requestOptions?: Options;
};

export declare type DisbursementRefundListAllResponse = {
  refunds?: Array<DisbursementRefundResponse>;
};
