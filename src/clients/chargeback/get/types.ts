import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type ChargebackGetClient = {
  id: string;
  config: MercadoPagoConfig;
};

export declare type ChargebackGetData = {
  id: string;
  requestOptions?: Options;
};
