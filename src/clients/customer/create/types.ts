import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CustomerCard = {
  customerId: string;
  body: CustomerCardBody;
  config: MercadoPagoConfig;
};

export declare type CustomerCardBody = {
  token: string;
};

export declare type CustomerCardCreate = {
  customerId: string;
  customerCardBody: CustomerCardBody;
};



