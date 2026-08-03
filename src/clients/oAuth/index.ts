/**
 * OAuth client for the MercadoPago API.
 *
 * Provides methods for the full OAuth 2.0 authorization-code flow:
 * generating the authorization URL, exchanging an authorization code for
 * tokens, and refreshing expired access tokens.
 *
 * @module oAuth
 */

import create from './create';
import refresh from './refresh';
import getAuthorizationURL from './getAuthorizationURL';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OAuthCreateData } from './create/types';
import type { OAuthGetAuthorizationURLData } from './getAuthorizationURL/types';
import type { OAuthRefreshData } from './refresh/types';
import type { OAuthResponse } from './commonTypes';

/**
 * Client facade for MercadoPago OAuth operations.
 *
 * Use this class to authenticate third-party sellers via the OAuth 2.0
 * authorization-code grant, obtain access/refresh token pairs, and
 * refresh tokens before they expire.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/authentication/oauth/_oauth_token/post Documentation }.
 */
export class OAuth {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Exchange an authorization code for an access token and refresh token.
	 *
	 * Call this after the seller is redirected back to your `redirect_uri`
	 * with a temporary `code` query parameter.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: OAuthCreateData): Promise<OAuthResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Obtain a new access token using a previously issued refresh token.
	 *
	 * Access tokens have a limited lifetime; call this method to rotate
	 * credentials without requiring the seller to re-authorize.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/refresh.ts Usage Example }.
	 */
	refresh({ body, requestOptions }: OAuthRefreshData): Promise<OAuthResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refresh({ body, config: this.config });
	}

	/**
	 * Build the MercadoPago authorization URL to which the seller should be redirected.
	 *
	 * The returned URL points to `auth.mercadopago.com` and includes the
	 * required OAuth query parameters. Redirect the seller to this URL so
	 * they can grant your application the requested permissions.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/getAuthorizationURL.ts Usage Example }.
	 */
	getAuthorizationURL({ options }: OAuthGetAuthorizationURLData): string {
		return getAuthorizationURL({ options });
	}
}
