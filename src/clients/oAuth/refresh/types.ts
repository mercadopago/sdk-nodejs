import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type RefreshOAuthRequest = {
  oauthRequest: RefreshOAuth;
  config: MercadoPagoConfig;
}

export declare type RefreshOAuth = {
  client_secret: string;
  client_id?: string;
  refresh_token: string;
}
