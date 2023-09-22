import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type PaymentCaptureRequestBody = {
  id: string;
  transaction_amount?: number, // transaction amount é opcional. troquei aqui.
}

export declare interface PaymentCaptureRequest extends PaymentCaptureRequestBody {
  config: MercadoPagoConfig;
}
