import type { CustomerCardCardholder } from '@src/clients/commonTypes';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export declare type CustomerCardsUpdateClient = {
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

export declare type CustomerCardsUpdateData = {
  customerId?: string;
  cardId?: string;
  customerCardBody?: CustomerCardUpdateBody;
  requestOptions?: Options
};
