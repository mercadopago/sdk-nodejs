import MercadoPago, { Invoice } from '@src/index';

/**
 * Mercado Pago Invoice.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_authorized_payments_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const invoice = new Invoice(client);
const options = {
	id: 1234,
	preapproval_id: '<PREAPPROVAL_ID>',
	payment_id: 1234,
	payer_id: 1234
};

invoice.search({ options }).then(console.log).catch(console.log);
