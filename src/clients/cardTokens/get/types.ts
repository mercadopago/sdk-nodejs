import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CardTokenGetClient = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type CardTokenGetData = {
  cardTokenId?: string;
  requestOptions?: Options
};




