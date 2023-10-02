import type { CustomerCardCardholder } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCardUpdateClient = {
  customerId: string;
  cardId: string;
  body: CustomerCardUpdateBody;
  config: MercadoPagoConfig;
};

export declare type CustomerCardUpdateBody = {
  expiration_month?: number;
  expiration_year?: number;
  cardholder?: CustomerCardCardholder;
  token?: string;
};

export declare type CustomerCardUpdateData = {
  customerId: string;
  cardId: string;
  body: CustomerCardUpdateBody;
  requestOptions?: Options;
};
