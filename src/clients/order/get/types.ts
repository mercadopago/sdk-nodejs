import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderGetData = {
  id: string;
  requestOptions?: Options;
}

export declare type OrderGetClient = {
  config: MercadoPagoConfig;
  id: string;
}