import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CancelOrderData = {
  id: string;
  requestOptions?: Options;
}

export declare type CancelOrderClient = CancelOrderData & {
  config: MercadoPagoConfig;
}