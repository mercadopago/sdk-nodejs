/**
 * Mercado Pago Payment Update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments_id/put Documentation }.
 */


import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const payment = new Payment(client);

payment.cancel({
	id: '<PAYMENT_ID>',
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	},
}).then(console.log).catch(console.log);

