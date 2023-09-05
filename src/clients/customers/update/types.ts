import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';

export declare type CustomerUpdate = {
  customerId: string;
  body: CustomerRequestBody;
};

export declare type CustomerUpdateRequest = {
  customerId: string;
  body: CustomerRequestBody;
  config: MercadoPagoConfig;
};
