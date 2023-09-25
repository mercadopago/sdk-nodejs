import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const preference = new Preference(client);

preference.update({
	id: '<ID>',
	updatePreferenceRequest: {
		items: [
			{
				id: '<ID>',
				title: '<TITLE>',
				quantity: 1,
				unit_price: 12.34
			}
		],
	}
}).then(console.log).catch(console.log);

