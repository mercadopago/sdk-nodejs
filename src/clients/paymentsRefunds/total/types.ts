import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentsRefundTotalData = {
  payment_id: string;
  requestOptions?: Options;
};

export declare type PaymentsRefundTotalClient = {
  payment_id: string;
  config: MercadoPagoConfig
};
