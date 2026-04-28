import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent List.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/orders/get-order/get Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const point = new Point(client);

point
	.getPaymentIntentList({ body: {
		options: {
			startDate: '<START_DATE>',
			endDate: '<START_DATE>',
		},
	} }).then(console.log).catch(console.log);
