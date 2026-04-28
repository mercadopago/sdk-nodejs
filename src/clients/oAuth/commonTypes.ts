/**
 * Shared response types for the OAuth client.
 *
 * Contains the common response structure returned by both the token
 * creation and token refresh operations of the MercadoPago OAuth API.
 *
 * @module oAuth/commonTypes
 */

import { ApiResponse } from '@src/types';

/**
 * Response returned after a successful OAuth token exchange or refresh.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/authentication/oauth/_oauth_token/post Documentation }.
 */
export declare interface OAuthResponse extends ApiResponse {
  /** Bearer token used to authenticate subsequent API requests. */
  access_token?: string;
  /** Public key associated with the application (used for client-side SDKs). */
  public_key?: string;
  /** Token used to obtain a new access token once the current one expires. */
  refresh_token?: string;
  /** Whether the credentials operate in production (`true`) or sandbox (`false`). */
  live_mode?: boolean;
  /** MercadoPago user ID that granted the authorization. */
  user_id?: number;
  /** Token type, typically `"bearer"`. */
  token_type?: string;
  /** Token time-to-live in seconds from the moment of issuance. */
  expires_in?: number;
  /** OAuth scopes granted to the access token (space-delimited). */
  scope?: string;
}
