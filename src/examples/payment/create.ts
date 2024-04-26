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
	transaction_details: {
		financial_institution: '<FINANCIAL_INSTITUCION>',
	},
	payer: {
		email: '<EMAIL>'
	},
},
requestOptions: {
	idempotencyKey: '<IDEMPOTENCY_KEY>'
} }).then(console.log).catch(console.log);


