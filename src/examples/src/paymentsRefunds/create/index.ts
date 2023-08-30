import MercadoPago, { PaymentsRefunds } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/chargebacks/_payments_id_refunds/post Documentation }.
 */

const client = new MercadoPago({ accessToken: 'APP_USR-4679935697572392-071411-ed200b57e5c38354adc3f4f6156c2f82-1273205088', options: { timeout: 5000 } });

const refund = new PaymentsRefunds(client);

refund.create({
	payment_id: '62932942380',
	body: {
		amount: 5
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));
