/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/online-payments/checkout-api/cards/save-card/post Documentation}.
 */
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new CustomerCard(client);

customerClient.create({ customerId: '<CUSTOMER_ID>', body: {
	token: '<TOKEN>',
} }).then(console.log).catch(console.log);
