/**
 * Mercado Pago Customer card get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/get Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new Customer(client);

customerClient.get('123')
	.then((result) => console.log(result));
