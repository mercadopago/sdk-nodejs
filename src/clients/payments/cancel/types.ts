import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

export declare type PaymentCancelData = {
  id?: string;
  requestOptions?: Options;
}

export declare interface PaymentCancelClient extends PaymentCancelData {
  config: MercadoPagoConfig;
}
