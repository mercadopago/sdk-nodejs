import create from './create';
import refresh from './refresh';
import getAuthorizationURL from './getAuthorizationURL';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OAuthCreateData } from './create/types';
import type { OAuthGetAuthorizationURLData } from './getAuthorizationURL/types';
import type { OAuthRefreshData } from './refresh/types';
import type { OAuthResponse } from './commonTypes';

/**
 * Mercado Pago OAuth.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */
export class OAuth {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Mercado Pago OAuth Create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/create.ts Usage Example  }.
	 */
	create({ body, requestOptions }: OAuthCreateData): Promise<OAuthResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Mercado Pago OAuth Refresh.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/refresh.ts Usage Example  }.
	 */
	refresh({ body, requestOptions }: OAuthRefreshData): Promise<OAuthResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refresh({ body, config: this.config });
	}

	/**
	 * Mercado Pago OAuth getAuthorizationURL.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/getAuthorizationURL.ts Usage Example  }.
	 */
	getAuthorizationURL({ options }: OAuthGetAuthorizationURLData): string {
		return getAuthorizationURL({ options });
	}
}
