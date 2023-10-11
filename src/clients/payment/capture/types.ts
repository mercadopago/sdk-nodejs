import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type PaymentCaptureData = {
  id: string | number;
  transaction_amount?: number;
  requestOptions?: Options;
}

export declare interface PaymentCaptureClient extends PaymentCaptureData {
  config: MercadoPagoConfig;
}
