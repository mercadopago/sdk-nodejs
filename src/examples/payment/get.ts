/**
 * Mercado Pago Payment Update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/online-payments/checkout-api-payments/get-payment/get Documentation }.
 */

import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const payment = new Payment(client);

payment.get({
	id: '<PAYMENT_ID>',
}).then(console.log).catch(console.log);

