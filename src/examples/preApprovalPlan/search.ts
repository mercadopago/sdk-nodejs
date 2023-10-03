import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.search({ options: {
	status: '<STATUS>',
	q: '<Q>',
} }).then(console.log).catch(console.log);
