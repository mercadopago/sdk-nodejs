import MercadoPago, { PreApprovalPlan } from '@src/index';

/**
 * Mercado Pago Pre Approval Plan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_plan_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });
const preApprovalPlan = new PreApprovalPlan(client);

preApprovalPlan.get({ preApprovalPlanId: '<PRE_APPROVAL_PLAN_ID>' }).then(console.log).catch(console.log);

