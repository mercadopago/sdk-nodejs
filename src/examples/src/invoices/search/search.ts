import MercadoPago, { Invoices } from '@src/index';

/**
 * Mercado Pago Invoices.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_authorized_payments_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 9000 } });

const invoices = new Invoices(client);

invoices.search({
	id: 1234,
	preapproval_id: 'test',
	payment_id: 1234,
	payer_id: 1234
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
