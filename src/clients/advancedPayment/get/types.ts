import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type AdvancedPaymentGetClient = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type AdvancedPaymentGetData = {
  id: string;
  requestOptions?: Options;
}; 