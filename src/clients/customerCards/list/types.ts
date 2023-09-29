import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCardsListClient = {
  customerId: string;
  config: MercadoPagoConfig;
};

export declare type CustomerCardsListData = {
  customerId?: string;
  requestOptions?: Options
};
