/**
 * Mercado Pago Customer card remove.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/cards/_customers_customer_id_cards_id/delete Documentation }.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new CustomerCard(client);

customerClient.remove({ customerId: 'customer_id', cardId : 'card_id' })
	.then((result) => console.log(result));
