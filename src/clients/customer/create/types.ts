import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';
import { Options } from '@src/types';

export declare type CustomerCreateData = {
  body: CustomerRequestBody;
  requestOptions?: Options;
}

export declare type CustomerCreateClient = {
  body: CustomerRequestBody;
  config: MercadoPagoConfig;
};
