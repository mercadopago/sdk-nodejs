import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preference = new Preference(client);

preference.create({
	items: [
		{
			id: '1234',
			title: 'Dummy Title',
			description: 'Dummy description',
			picture_url: 'http://www.myapp.com/myimage.jpg',
			category_id: 'car_electronics',
			quantity: 1,
			currency_id: '$',
			unit_price: 10
		}
	],
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
