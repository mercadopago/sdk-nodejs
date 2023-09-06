import MercadoPago, { PaymentsRefunds } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/chargebacks/_payments_id_refunds/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const refund = new PaymentsRefunds(client);

refund.list({
	payment_id: '123'
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
