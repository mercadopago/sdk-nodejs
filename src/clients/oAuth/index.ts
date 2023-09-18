import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { OAuthRequest } from './create/types';
import create from './create';
import refresh from './refresh';
import getAuthorizationURL from './getAuthorizationURL';
import { AuthorizationRequest } from './getAuthorizationURL/types';
import { RefreshOAuth } from './refresh/types';
import { OAuthResponse } from './commonTypes';

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
	 * Mercado Pago Create.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/oauth/create/create.ts Usage Example  }.
	 */
	create(oauthRequest: OAuthRequest): Promise<OAuthResponse> {
		return create({ oauthRequest, config: this.config });
	}

	refresh(oauthRequest: RefreshOAuth): Promise<OAuthResponse> {
		return refresh({ oauthRequest, config: this.config });
	}

	getAuthorizationURL(filters : AuthorizationRequest): string {
		return getAuthorizationURL({ filters });
	}

}
