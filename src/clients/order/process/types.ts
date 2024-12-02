import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type ProcessOrderData = {
  id: string;
  requestOptions?: Options;
}

export declare type ProcessOrderClient = ProcessOrderData & {
  config: MercadoPagoConfig;
}