import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 9000 } });

const preference = new Preference(client);

preference.search({
	sponsor_id: '0',
	external_reference: '',
	site_id: 'MLA',
	marketplace: 'NONE'
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
