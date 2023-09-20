/**
 * Mercado Pago OAuth Refresh.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/oauth/_oauth_token/post Documentation }.
 */

import MercadoPago, { OAuth } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const oauth = new OAuth(client);

oauth.refresh({
	'client_secret': '<your-client-secret>',
	'client_id': '<your-client-id>',
	'refresh_token': 'TG-XXXXXXXXXXXXX-XXXXXXX'
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
