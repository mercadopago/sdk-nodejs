import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type UserGet = {
  config: MercadoPagoConfig;
};

export declare type UserResponse = {
  id: number;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  siteId: string;
  countryId: string;
};
