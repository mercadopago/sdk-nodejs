import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan_id/put Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.update({
	id: '<ID>',
	updatePreApprovalPlanRequest: {
		back_url: '<BACK_URL>',
		reason: '<REASON>',
		auto_recurring:	{
			currency_id: '<CURRENCY_ID>',
			transaction_amount: 12.34,
			frequency: 1,
			frequency_type: '<FREQUENCY_TYPE>',
		},
	}
}).then(console.log).catch(console.log);
