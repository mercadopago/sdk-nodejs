import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PointCancelPaymentIntentClient = {
  device_id: string;
  payment_intent_id: string;
  config: MercadoPagoConfig;
}

export declare type PointCancelPaymentIntentData = {
  device_id: string;
  payment_intent_id: string;
  requestOptions?: Options;
}
