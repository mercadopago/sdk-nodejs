/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/customers/_customers/post Documentation}.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new CustomerCard(client);

customerClient.create({ customerId: '<CUSTOMER_ID>', body: {
	token: '<TOKEN>',
} }).then(console.log).catch(console.log);
