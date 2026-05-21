/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post Documentation}.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.create({
	body: {
		first_name: '<FIRST_NAME>',
		last_name: '<LAST_NAME>',
		email: '<EMAIL>'
	}
}).then(console.log).catch(console.log);
