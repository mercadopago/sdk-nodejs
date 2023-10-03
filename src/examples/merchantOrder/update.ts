/**
 * Mercado Pago MerchantOrder card update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders_id/put Documentation }.
*/
import MercadoPago, { MerchantOrder } from '@src/index';

const client = new MercadoPago({ accessToken: 'ACCESS_TOKEN' });
const merchantOrderClient = new MerchantOrder(client);

merchantOrderClient.update({ merchantOrderId: '<MERCHANT_ORDER_ID>',  body: {
	external_reference: '<EXTERNAL_REFERENCE>',
	preference_id: '<PREFERENCE_ID>',
	collector: {
		id: 1234
	},
	site_id: '<SITE_ID>',
	items: [
		{
			id: '<ITEM_ID>',
			quantity: 1234,
		}
	],
	application_id: '<APPLICATION_ID>',
	version: 12.34
}  }).then(console.log).catch(console.log);
