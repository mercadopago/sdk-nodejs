import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCardListClient = {
  customerId: string;
  config: MercadoPagoConfig;
};

export declare type CustomerCardListData = {
  customerId: string;
  requestOptions?: Options;
};
