import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type Capture = {
  capture?: boolean;
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
