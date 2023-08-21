import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CardTokenCreate = {
  body: CardTokenRequest;
  config: MercadoPagoConfig;
};

export declare type CardTokenRequest = {
  card_id: string;
  customer_id?: string;
  security_code: string;
};

export declare type CardTokenBody = {
  cardTokenBody: CardTokenRequest;
};



