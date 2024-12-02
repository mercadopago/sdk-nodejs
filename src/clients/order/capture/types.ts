
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type OrderCaptureData = {
  id: string;
  requestOptions?: Options;
}

export declare type CaptureOrderClient = {
  config: MercadoPagoConfig;
  id: string;
}
