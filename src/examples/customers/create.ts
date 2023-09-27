/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post Documentation}.
*/
import { Customer } from '@src/index';
import MercadoPago from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.create({
	first_name: '<FIRST_NAME>',
	last_name: 'LAST_NAME',
}).then(console.log).catch(console.log);
