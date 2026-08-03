import MercadoPago, { PaymentRefund } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api-payments/get-refund/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const refund = new PaymentRefund(client);

refund.get({
	payment_id: '<PAYMENT_ID>',
	refund_id: '<REFUND_ID>'
}).then(console.log).catch(console.log);
