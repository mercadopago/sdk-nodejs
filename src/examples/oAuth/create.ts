/**
 * Mercado Pago OAuth Create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const oauth = new OAuth(client);

oauth.create({ body: {
	client_secret: '<CLIENT_SECRET>',
	client_id: 'CLIENT_ID',
	code: '<CODE>',
	redirect_uri: '<REDIRECT_URI>'
} }).then(console.log).catch(console.log);
