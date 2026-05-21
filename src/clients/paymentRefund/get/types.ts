import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentRefundGetData = {
  payment_id: string | number;
  refund_id: string | number;
  requestOptions?: Options;
};

export declare type PaymentRefundGetClient = {
  payment_id: string | number;
  refund_id: string | number;
  config: MercadoPagoConfig
};
