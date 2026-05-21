import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCardCreateClient = {
  customerId?: string;
  body?: CustomerCardBody;
  config?: MercadoPagoConfig;
};

export declare type CustomerCardBody = {
  token?: string;
};

export declare type CustomerCardCreateData = {
  customerId: string;
  body: CustomerCardBody;
  requestOptions?: Options;
};
