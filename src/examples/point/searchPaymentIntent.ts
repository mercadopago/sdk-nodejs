import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Search Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/orders/get-order/get Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const point = new Point(client);

point.searchPaymentIntent({ payment_intent_id: '<PAYMENT_INTENT_ID>' }).then(console.log).catch(console.log);
