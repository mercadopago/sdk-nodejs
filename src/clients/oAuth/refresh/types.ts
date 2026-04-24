/**
 * Request and internal types for the OAuth token refresh operation.
 *
 * @module oAuth/refresh/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

/** Internal parameters passed to the `refresh` implementation function. */
export declare type OAuthRefreshClient = {
  /** Request body containing the refresh token and app credentials. */
  body: OAuthRefresh;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
}

/** Body payload for refreshing an expired OAuth access token. */
export declare type OAuthRefresh = {
  /** Application secret obtained from the MercadoPago developer dashboard. */
  client_secret?: string;
  /** Application ID obtained from the MercadoPago developer dashboard. */
  client_id?: string;
  /** Refresh token previously returned by the create or refresh operation. */
  refresh_token?: string;
}

/** Public input for {@link OAuth.refresh}, accepted by the class facade. */
export declare type OAuthRefreshData = {
  /** Request body with the refresh token and app credentials. */
  body: OAuthRefresh;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}
