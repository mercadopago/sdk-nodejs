/**
 * Mercado Pago Payment Capture.
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-api/payment-management/make-value-reserve Documentation }.
 */


import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const payment = new Payment(client);

payment.capture({
	id: '<PAYMENT_ID>',
	transaction_amount: 12.34,
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	},
}).then(console.log).catch(console.log);

