/**
 * Request and response types for building the OAuth authorization URL.
 *
 * @module oAuth/getAuthorizationURL/types
 */

/** Internal parameters passed to the `getAuthorizationURL` implementation function. */
export declare type OAuthGetAuthorizationURLClient = {
  /** Authorization request options used to construct query parameters. */
  options: AuthorizationRequest;
};

/** Query parameters appended to the MercadoPago authorization endpoint URL. */
export declare type AuthorizationRequest = {
  /** Application ID from the MercadoPago developer dashboard. */
  client_id?: string;
  /** Opaque value for CSRF protection, returned unchanged in the callback. */
  state?: string;
  /** URL where the seller is redirected after granting or denying authorization. */
  redirect_uri?: string;
};

/** Response containing the fully constructed authorization URL. */
export declare type AuthorizationResponse = {
  /** Complete URL to which the seller should be redirected. */
  authorization_url: string;
};

/** Public input for {@link OAuth.getAuthorizationURL}, accepted by the class facade. */
export declare type OAuthGetAuthorizationURLData = {
  /** Optional authorization request parameters (client_id, state, redirect_uri). */
  options?: AuthorizationRequest;
}
