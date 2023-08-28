import type { CustomerCardCardholder } from '@src/clients/cardtokens/get/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CustomerCardConfigUpdate = {
  customerId: string;
  cardId: string;
  body: CustomerCardUpdateBody;
  config: MercadoPagoConfig;
};

export declare type CustomerCardUpdateBody = {
  expiration_month?: number;
  expiration_year?: string;
  cardholder: CustomerCardCardholder;
  token?: string;
};

export declare type CustomerCardUpdate = {
  customerId: string;
  cardId: string;
  customerCardBody: CustomerCardUpdateBody;
};
