import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval .
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const preApproval = new PreApproval(client);

preApproval.get({ id: '<ID>' }).then(console.log).catch(console.log);
