/**
 * Mercado Pago OAuth getAuthorizationURL.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const oauth = new OAuth(client);

const getCode = oauth.getAuthorizationURL({
	client_id: '<your-client-id>',
	state: '12345',
	redirect_uri: 'redirect-uri',
});

console.log(getCode);
