import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { PaymentIntentRequest } from '../commonTypes';

export declare type CreatePaymentIntent = {
  device_id: string;
  request: PaymentIntentRequest;
  config: MercadoPagoConfig;
};

export declare type CreatePaymentIntentRequest = {
  device_id: string;
  request: PaymentIntentRequest;
};
