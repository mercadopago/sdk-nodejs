import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentRefundListData = {
  payment_id: string;
  requestOptions?: Options;
};

export declare type PaymentRefundListClient = {
  payment_id: string;
  config: MercadoPagoConfig;
};
