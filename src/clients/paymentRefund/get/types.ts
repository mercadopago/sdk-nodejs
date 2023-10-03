import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentRefundGetData = {
  payment_id: string;
  refund_id: string;
  requestOptions?: Options;
};

export declare type PaymentRefundGetClient = {
  payment_id: string
  refund_id: string;
  config: MercadoPagoConfig
};
