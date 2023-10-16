/**
 * Mercado Pago Customer card update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/put Documentation }.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new CustomerCard(client);

customerClient.update({ customerId: '<CUSTOMER_ID>', cardId : '<CARD_ID>', body: {
	cardholder: {
		name: '<NAME>',
		identification: {
			type: '<TYPE>',
		}
	},
} })
	.then(console.log).catch(console.log);
