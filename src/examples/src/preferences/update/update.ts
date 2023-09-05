import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preference = new Preference(client);

preference.update({
	id: 'id',
	updatePreferenceRequest: {
		additional_info: 'teste update',
		expires: false,
		items: [
			{
				id: '1234',
				title: 'Dummy Title',
				description: 'Dummy update',
				picture_url: 'http://www.myapp.com/myimage.jpg',
				category_id: 'car_electronics',
				quantity: 2,
				currency_id: '$',
				unit_price: 20
			}
		],
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));

