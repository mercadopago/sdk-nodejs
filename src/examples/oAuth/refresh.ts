/**
 * Mercado Pago OAuth Refresh.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const oauth = new OAuth(client);

oauth.refresh({ body: {
	client_secret: '<CLIENT_SECRET>',
	client_id: 'CLIENT_ID',
	refresh_token: '<REFRESH_TOKEN>'
} }).then(console.log).catch(console.log);
