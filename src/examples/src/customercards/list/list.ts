/**
 * Mercado Pago Customer card list.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/cards/_customers_customer_id_cards/get Documentation }.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new CustomerCard(client);

customerClient.listAll({ customerId: 'customer_id' })
	.then((result) => console.log(result));
