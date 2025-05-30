import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type AdvancedPaymentCaptureClient = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentCaptureData = {
  id: string;
  requestOptions?: Options;
}; 