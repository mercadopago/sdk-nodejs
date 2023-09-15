import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.create({
	'back_url': 'https://www.test.com',
	'reason': 'Plano Mensal Gold',
	'auto_recurring': {
		'currency_id': 'BRL',
		'transaction_amount': 123,
		'frequency': 1,
		'frequency_type': 'months',
		'repetitions': 12,
		'free_trial': {
			'frequency_type': 'months',
			'frequency': 1,
		},
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
