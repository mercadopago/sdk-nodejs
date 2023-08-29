/**
 * Mercado Pago Customer card update.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/cards/_customers_customer_id_cards_id/put Documentation }.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new CustomerCard(client);

const body = {
	cardholder: {
		name: 'name',
		identification: {
			number: 'number',
			type: 'document type',
		}
	},
	token : 'token card'
};

customerClient.update({ customerId: 'customer_id', cardId : 'card_id', customerCardBody: body })
	.then((result) => console.log(result));
