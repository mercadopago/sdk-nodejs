import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/subscriptions/_preapproval_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 9000 } });

const preApproval = new PreApproval(client);

preApproval.update({
	id: '1234',
	body: {
		back_url: 'https://www.test.com',
		reason: 'test',
		auto_recurring: {
			transaction_amount: 10,
			currency_id: '123'
		}
	},
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
