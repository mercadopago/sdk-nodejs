import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type IdentificationTypeGet = {
  config: MercadoPagoConfig;
};

export declare type IdentificationTypeResponse = {
  id: string;
  name: string;
  type: string;
  min_length: number;
  max_length: number;
};
