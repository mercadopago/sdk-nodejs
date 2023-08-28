/**
 * Mercado Pago Customer card get.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/cards/_customers_customer_id_cards_id/get Documentation }.
*/
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new CustomerCard(client);

customerClient.get({ customerId: 'customer_id', cardId : 'card_id' })
	.then((result) => console.log(result));