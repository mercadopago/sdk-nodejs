import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type OAuthRefreshRequest = {
  oauthRequest: OAuthRefresh;
  config: MercadoPagoConfig;
}

export declare type OAuthRefresh = {
  client_secret: string;
  client_id?: string;
  refresh_token: string;
}
