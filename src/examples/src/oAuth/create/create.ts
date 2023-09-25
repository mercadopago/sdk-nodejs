/**
 * Mercado Pago OAuth Create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } }); // preciso desse client?

const oauth = new OAuth(client);

oauth.create({
	'client_secret': '<your-client-secret>',
	'client_id': '<your-client-id>',
	'code': '<return-of-getAuthorizationURL-function>',
	'redirect_uri': '<redirect-uri>'
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
