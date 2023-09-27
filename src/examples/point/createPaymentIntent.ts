import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Create Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api_paymentintent_mlb/_point_integration-api_devices_deviceid_payment-intents/post Documentation }.
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
