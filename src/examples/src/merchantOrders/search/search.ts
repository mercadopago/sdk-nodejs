/**
 * Mercado Pago Customer card list.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/merchant_orders/_merchant_orders_search/get Documentation }.
*/
import MercadoPago, { MerchantOrder } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new MerchantOrder(client);

customerClient.search({  application_id: '10000000000000000' })
	.then((result) => console.log(result));
