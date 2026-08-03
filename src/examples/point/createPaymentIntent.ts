import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Create Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/orders/create-order/post Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>',options: { timeout: 5000 } });

const point = new Point(client);

point
	.createPaymentIntent({
		device_id: '<DEVICE_ID>',
		request: {
			amount: 12.34,
		},
	}).then(console.log).catch(console.log);
