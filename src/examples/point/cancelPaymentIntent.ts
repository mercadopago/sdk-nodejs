import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Cancel Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_deviceid_payment-intents_paymentintentid/delete Documentation }.
 */
const client = new MercadoPago({
	accessToken: '<ACCESS_TOKEN>',
	options: { timeout: 5000 },
});

const point = new Point(client);

point.cancelPaymentIntent({ device_id: '<DEVICE_ID>', payment_intent_id: '<PAYMENT_INTENT_ID>' }).then(console.log).catch(console.log);
