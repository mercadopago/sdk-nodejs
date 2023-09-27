import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval .
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval/post Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const preApproval = new PreApproval(client);

preApproval.create({ body: {
	reason: '<REASON>',
	payer_email: '<PAYER_EMAIL>',
	auto_recurring: {
		frequency: 12,
		frequency_type: '<FREQUENCY_TYPE>',
		transaction_amount: 12.34,
		currency_id: '<CURRENCY_ID>',
	},
	back_url: '<BACK_URL>'
} }).then(console.log).catch(console.log);
