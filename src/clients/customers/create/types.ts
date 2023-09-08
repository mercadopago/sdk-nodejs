import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CustomerRequestBody } from '../commonTypes';

export declare type CustomerCreate = {
  body: CustomerRequestBody;
};

export declare type CustomerCreateRequest = {
  body: CustomerRequestBody;
  config: MercadoPagoConfig; 
};