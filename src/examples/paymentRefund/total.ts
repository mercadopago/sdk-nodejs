import MercadoPago, { PaymentRefund } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api-payments/create-refund/post Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const refund = new PaymentRefund(client);

refund.total({
	payment_id: '<PAYMENT_ID>',
}).then(console.log).catch(console.log);
