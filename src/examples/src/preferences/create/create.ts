import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preference = new Preference(client);

preference.create({
	'external_reference': 'teste_eltin',
	'items': [
		{
			'id': '4567',
			'title': 'Videogame',
			'description': 'Playstation',
			'picture_url': 'http://i.mlcdn.com.br/portaldalu/fotosconteudo/48029_01.jpg',
			'category_id': 'eletronico',
			'quantity': 2,
			'currency_id': 'BRL',
			'unit_price': 5.00
		}
	],
	'payment_methods': {
		'default_payment_method_id': 'master',
		'excluded_payment_types': [
			{
				'id': 'ticket'
			}
		],
		'excluded_payment_methods': [
			{
				'id': ''
			}
		],
		'installments': 12,
		'default_installments': 1
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
