import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Create Payment Intent.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api_paymentintent_mlb/_point_integration-api_devices_deviceid_payment-intents/post Documentation }.
 */
const client = new MercadoPago({
	accessToken: 'access_token',
	options: { timeout: 5000 },
});

const point = new Point(client);

point
	.createPaymentIntent({
		device_id: '123456789',
		request: {
			amount: 100,
		},
	})
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
