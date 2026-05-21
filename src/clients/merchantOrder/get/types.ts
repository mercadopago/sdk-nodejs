import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

export declare type MerchantOrderGetClient = {
  merchantOrderId: string | number;
  config: MercadoPagoConfig;
}

export declare type MerchantOrderGetData = {
  merchantOrderId: string | number;
  requestOptions?: Options;
}
