import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.update({
	id: 'id',
	updatePreApprovalPlanRequest: {
		back_url: 'https://www.test.com',
		reason: 'Test Reason',
		auto_recurring:	{
			currency_id: 'BRL',
			transaction_amount: 100,
			frequency: 1,
			frequency_type: 'months',
			repetitions: 6,
			free_trial: {
				frequency: 1,
				frequency_type: 'months',
			},
		},
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
