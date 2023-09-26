import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type InvoicesGetRequest = {
  id: string; 
  requestOptions?: Options;
}

export declare type GetInvoicesRequest = {
  id: string;
  config: MercadoPagoConfig
};

