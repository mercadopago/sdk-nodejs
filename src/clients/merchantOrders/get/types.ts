import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

export declare type MerchantOrderGetClient = {
  merchantOrderId: string;
  config: MercadoPagoConfig;
}

export declare type MerchantOrderGetData = {
  merchantOrderId?: string;
  requestOptions?: Options;
}
