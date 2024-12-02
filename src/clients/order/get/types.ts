import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type GetOrderData = {
  id: string;
  requestOptions?: Options;
}

export declare type GetOrderClient = GetOrderData & {
  config: MercadoPagoConfig
}