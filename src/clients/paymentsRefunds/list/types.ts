import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentsRefoundsListData = {
  payment_id?: string;
  requestOptions?: Options;
};

export declare type PaymentsRefoundsListClient = {
  payment_id: string;
  config: MercadoPagoConfig;
};
