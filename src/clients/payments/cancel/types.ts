import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PaymentCancelRequestBody = {
  id: string;
}

export declare interface PaymentCancelRequest extends PaymentCancelRequestBody {
  config: MercadoPagoConfig;
}
