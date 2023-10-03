import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preference/_checkout_preference/post Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const preference = new Preference(client);

preference.create({ body: {
	items: [
		{
			id: '<ID>',
			title: '<title>',
			quantity: 1,
			unit_price: 12.34
		}
	],
} }).then(console.log).catch(console.log);
