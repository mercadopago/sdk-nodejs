import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const preApproval = new PreApproval(client);
const filters = {
	status: '<STATUS>'
};

preApproval.search({ filters }).then(console.log).catch(console.log);
