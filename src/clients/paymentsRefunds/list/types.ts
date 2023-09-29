import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentsRefundsListData = {
  payment_id: string;
  requestOptions?: Options;
};

export declare type PaymentsRefundsListClient = {
  payment_id: string;
  config: MercadoPagoConfig;
};
