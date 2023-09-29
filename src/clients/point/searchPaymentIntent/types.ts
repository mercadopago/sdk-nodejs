import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PointSearchPaymentIntentClient = {
  payment_intent_id: string;
  config: MercadoPagoConfig;
}

export declare type PointSearchPaymentIntentData = {
  payment_intent_id: string;
  requestOptions?: Options;
}
