import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 9000 } });

const preApproval = new PreApproval(client);
const options = {
	status: '<STATUS>'
};

preApproval.search({ options }).then(console.log).catch(console.log);
