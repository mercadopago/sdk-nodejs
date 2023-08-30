import MercadoPago, { PaymentsRefunds } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/chargebacks/_payments_id_refunds_refund_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const refund = new PaymentsRefunds(client);

refund.get({
	payment_id: '123',
	refund_id: '456'
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
