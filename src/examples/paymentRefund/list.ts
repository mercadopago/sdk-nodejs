import MercadoPago, { PaymentRefund } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api-payments/get-refunds/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const refund = new PaymentRefund(client);

refund.list({
	payment_id: '<PAYMENT_ID>'
}).then(console.log).catch(console.log);
