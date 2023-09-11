import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type Capture = {
  transaction_amount?: number;
};

export declare type PaymentCaptureRequest = {
  id: string;
  body: Capture;
}

export declare type PaymentCapture = {
  id: string;
  body: Capture;
  config: MercadoPagoConfig;
};
