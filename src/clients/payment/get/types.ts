import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentGetData = {
  id: string | number;
  requestOptions?: Options;
}

export declare interface PaymentGetClient extends PaymentGetData {
  config: MercadoPagoConfig;
}
