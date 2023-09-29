import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type InvoicesGetData = {
  id?: string;
  requestOptions?: Options;
}

export declare type InvoicesGetClient = {
  id: string;
  config: MercadoPagoConfig
};

