import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const preApproval = new PreApproval(client);

preApproval.update({
	id: '<ID>',
	body: {
		back_url: '<BACK_URL>',
		reason: '<REASON>',
		auto_recurring: {
			transaction_amount: 12.34,
			currency_id: '123'
		}
	},
}).then(console.log).catch(console.log);
