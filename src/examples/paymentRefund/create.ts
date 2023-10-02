import MercadoPago, { PaymentRefund } from '@src/index';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/chargebacks/_payments_id_refunds/post Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const refund = new PaymentRefund(client);

refund.create({
	payment_id: '<PAYMENT_ID>',
	body: {
		amount: 12.34
	}
}).then(console.log).catch(console.log);
