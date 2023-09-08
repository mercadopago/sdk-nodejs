import MercadoPago, { PaymentsRefunds } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/chargebacks/_payments_id_refunds/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const refund = new PaymentsRefunds(client);

refund.create({
	payment_id: '123',
	body: {
		amount: 5
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
