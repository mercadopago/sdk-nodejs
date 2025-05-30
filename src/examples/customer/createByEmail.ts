import MercadoPago, { Customer } from '@src/index';

/**
 * Mercado Pago Customer Create By Email.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const customer = new Customer(client);

customer.createByEmail({
	email: 'customer@example.com',
	first_name: 'João',
	last_name: 'Silva'
}).then(console.log).catch(console.log); 