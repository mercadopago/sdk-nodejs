import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse } from '@src/types';

export declare type IdentificationTypeGet = {
  config: MercadoPagoConfig;
};

export declare interface IdentificationTypeResponse extends ApiResponse {
  id: string;
  name: string;
  type: string;
  min_length: number;
  max_length: number;
}
