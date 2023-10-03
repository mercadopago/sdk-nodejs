/**
 * Mercado Pago OAuth getAuthorizationURL.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const oauth = new OAuth(client);

const getCode = oauth.getAuthorizationURL({ options: {
	client_id: '<CLIENT_ID>',
	state: '<STATE>',
	redirect_uri: '<REDIRECT_URI>',
} });

console.log(getCode);
