/**
 * Mercado Pago MerchantOrder create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders/post Documentation}.
*/
import { MerchantOrder } from '@src/index';
import MercadoPago from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const merchantOrderClient = new MerchantOrder(client);

const body = {
	external_reference: 'default',
	preference_id: 'Preference identification',
	payer: {
		id: 123,
		nickname: 'JOHN'
	},
	site_id: 'MLA',
	items: [
		{
			id: 'item id',
			category_id: 'item category',
			currency_id: 'BRL',
			description: 'item description',
			picture_url: 'item picture',
			quantity: 1,
			unit_price: 5,
			title: 'item title'
		}
	],
	application_id: '10000000000000000'
};

merchantOrderClient.create({ body })
	.then((result) => console.log(result));
