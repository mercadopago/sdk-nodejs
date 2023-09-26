/**
 * Mercado Pago MerchantOrder create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders/post Documentation}.
*/
import { MerchantOrder } from '@src/index';
import MercadoPago from '@src/index';

const client = new MercadoPago({ accessToken: 'ACCESS_TOKEN' });
const merchantOrderClient = new MerchantOrder(client);

merchantOrderClient.create({ body: {
	external_reference: '<EXTERNAL_REFERENCE>',
	preference_id: '<PREFERENCE_ID>',
	collector: {
		id: 1234
	},
	site_id: '<SITE_ID>',
	items: [
		{
			id: '<ITEM_ID>',
			category_id: 'item category',
			currency_id: 'BRL',
			description: 'item description',
			picture_url: 'item picture',
			quantity: 1,
			unit_price: 5,
			title: 'item title'
		}
	],
	application_id: '<APPLICATION_ID>',
	version: 12.34
} }).then(console.log).catch(console.log);
