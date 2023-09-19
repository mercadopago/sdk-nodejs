import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PaymentGetRequestBody = {
  id: string;
}

export declare interface PaymentGetRequest extends PaymentGetRequestBody {
  config: MercadoPagoConfig;
}
