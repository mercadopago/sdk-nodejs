import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent Status.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/orders/get-order/get Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>',options: { timeout: 5000 } });

const point = new Point(client);

point
	.getPaymentIntentStatus({ payment_intent_id: '<PAYMENT_INTENT_ID>' }).then(console.log).catch(console.log);
