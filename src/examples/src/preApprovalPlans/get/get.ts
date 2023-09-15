import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });
const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.get({ preApprovalPlanId: 'id' })
	.then((result) => console.log(result))
	.catch((error) => console.log(error));

