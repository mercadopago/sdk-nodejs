import MercadoPago, { PreApproval } from '@src/index';

/**
 * Mercado Pago Pre Approval .
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_preapproval_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preApproval = new PreApproval(client);

preApproval.get({ id: '123' }).then((result) => console.log(result))
	.catch((error) => console.log(error));
