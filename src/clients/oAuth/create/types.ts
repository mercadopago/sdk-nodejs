/**
 * Request and internal types for the OAuth token creation (authorization-code exchange).
 *
 * @module oAuth/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `create` implementation function. */
export declare type OAuthCreateClient = {
  /** Request body containing the authorization code and app credentials. */
  body: OAuthRequest;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Body payload for exchanging an authorization code for OAuth tokens. */
export declare type OAuthRequest = {
  /** Application secret obtained from the MercadoPago developer dashboard. */
  client_secret?: string;
  /** Application ID obtained from the MercadoPago developer dashboard. */
  client_id?: string;
  /** Temporary authorization code received via the redirect callback. */
  code?: string;
  /** Redirect URI that was registered when creating the authorization URL. */
  redirect_uri?: string;
}

/** Public input for {@link OAuth.create}, accepted by the class facade. */
export declare type OAuthCreateData = {
  /** Request body with the authorization code and app credentials. */
  body: OAuthRequest;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
