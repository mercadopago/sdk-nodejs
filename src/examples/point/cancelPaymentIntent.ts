import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Cancel Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/orders/cancel-order/post Documentation }.
 */
const client = new MercadoPago({
	accessToken: '<ACCESS_TOKEN>',
	options: { timeout: 5000 },
});

const point = new Point(client);

point.cancelPaymentIntent({ device_id: '<DEVICE_ID>', payment_intent_id: '<PAYMENT_INTENT_ID>' }).then(console.log).catch(console.log);
