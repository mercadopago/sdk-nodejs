import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CancelPaymentIntent = {
  device_id: string;
  payment_intent_id: string;
  config: MercadoPagoConfig;
}