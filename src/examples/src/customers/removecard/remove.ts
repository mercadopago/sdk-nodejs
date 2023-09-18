/**
 * Mercado Pago Customer card remove.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/delete Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new Customer(client);

customerClient.removeCard({ customerId: '123', cardId: '456' })
	.then((result) => console.log(result));
