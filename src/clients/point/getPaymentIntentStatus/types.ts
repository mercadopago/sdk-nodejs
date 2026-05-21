import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PointGetPaymentIntentStatusClient = {
  payment_intent_id: string;
  config: MercadoPagoConfig;
}

export declare type PointGetPaymentIntentStatusData = {
  payment_intent_id: string,
  requestOptions?: Options;
}
