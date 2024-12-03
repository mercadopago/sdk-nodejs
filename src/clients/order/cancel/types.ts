import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderCancelData = {
  id: string;
  requestOptions?: Options;
}

export declare type OrderCancelClient = {
  config: MercadoPagoConfig;
  id: string;
}