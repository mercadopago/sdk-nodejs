/**
 * Mercado Pago Payment Capture.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Documentation }.
 */


import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const payment = new Payment(client);

payment.create({ body: {
	transaction_amount: 12.34,
	description: '<DESCRIPTION>',
	payment_method_id: '<PAYMENT_METHOD_ID>',
	payer: {
		email: '<EMAIL>'
	},
  installments: 1, // if not an installment payment, set to 1
  token: '<String>', // Card token required for credit card payments
  transaction_amount: '<string||number>' // Ensure integer for Chile (MLC).
},
requestOptions: {
	idempotencyKey: '<IDEMPOTENCY_KEY>'
} }).then(console.log).catch(console.log);

