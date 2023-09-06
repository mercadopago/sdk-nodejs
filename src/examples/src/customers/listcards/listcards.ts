/**
 * Mercado Pago Customer card remove.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/cards/_customers_customer_id_cards/get Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new Customer(client);

customerClient.listCards({ customerId: '123' })
	.then((result) => console.log(result));