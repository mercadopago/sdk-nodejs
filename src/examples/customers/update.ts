/**
 * Mercado Pago Customer card update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/put Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.update({ customerId: '<CUSTOMER_ID>', body: {
	first_name: '<FIRST_NAME>'
},
}).then(console.log).catch(console.log);
