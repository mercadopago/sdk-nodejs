import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval .
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preApproval = new PreApproval(client);

preApproval.create({
	reason: 'test',
	external_reference: 'S01',
	payer_email: 'test@testuser.com',
	auto_recurring: {
		frequency: 1,
		frequency_type: 'months',
		transaction_amount: 123,
		currency_id: 'BRL',
	},
	back_url: 'https://www.test.com',
	status: 'pending',
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
