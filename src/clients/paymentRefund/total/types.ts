import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentRefundTotalData = {
  payment_id: string;
  requestOptions?: Options;
};

export declare type PaymentRefundTotalClient = {
  payment_id: string;
  config: MercadoPagoConfig
};
