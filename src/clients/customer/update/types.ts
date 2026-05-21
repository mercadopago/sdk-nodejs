import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';
import type { Options } from '@src/types';

export declare type CustomerUpdateData = {
  customerId: string;
  body: CustomerRequestBody;
  requestOptions?: Options;
};

export declare type CustomerUpdateClient = {
  customerId: string;
  body: CustomerRequestBody;
  config: MercadoPagoConfig;
};
