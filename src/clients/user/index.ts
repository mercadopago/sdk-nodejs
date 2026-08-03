/**
 * User client for the MercadoPago API.
 *
 * Provides a method to retrieve the profile of the user (seller)
 * authenticated by the current access token.
 *
 * @module user
 */

import get from './get';

import type { UserGetData, UserResponse } from './get/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Client facade for retrieving the authenticated MercadoPago user profile.
 *
 * Use this class to obtain account details such as name, email, site,
 * reputation scores, and account status for the user who owns the
 * current access token.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class User {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Retrieve the profile of the authenticated user.
	 *
	 * Calls the `GET /users/me` endpoint and returns comprehensive account
	 * information including personal data, reputation, and status.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/user/get/get.ts Usage Example }.
	 */
	get(userGetData: UserGetData = {}): Promise<UserResponse> {
		const { requestOptions } =  userGetData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ config: this.config });
	}
}
