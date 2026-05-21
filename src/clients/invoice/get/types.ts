import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type InvoiceGetData = {
  id: string;
  requestOptions?: Options;
}

export declare type InvoiceGetClient = {
  id: string;
  config: MercadoPagoConfig
};

