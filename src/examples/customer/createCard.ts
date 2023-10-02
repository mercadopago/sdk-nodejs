/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post Documentation}.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new Customer(client);

customerClient.createCard({ customerId: '<CUSTOMER_ID>', body: {
	token: '<TOKEN>',
} }).then(console.log).catch(console.log);
