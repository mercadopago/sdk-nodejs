import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export declare type CreateOAuthRequest = {
  oauthRequest: OAuthRequest;
  config: MercadoPagoConfig;
}

export declare type OAuthRequest = {
  client_secret: string;
  client_id?: string;
  code: string;
  redirect_uri: string;
}
