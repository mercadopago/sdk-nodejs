import MercadoPago, { Invoices } from '@src/index';

/**
 * Mercado Pago Invoices.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_authorized_payments_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const invoices = new Invoices(client);
const options = {
	id: 1234,
	preapproval_id: '<PREAPPROVAL_ID>',
	payment_id: 1234,
	payer_id: 1234
};

invoices.search({ options }).then(console.log).catch(console.log);
