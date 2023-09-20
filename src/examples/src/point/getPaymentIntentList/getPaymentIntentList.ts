import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent List.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_deviceid_payment-intents_paymentintentid/delete Documentation }.
 */
const client = new MercadoPago({
	accessToken: 'access_token',
	options: { timeout: 5000 },
});

const point = new Point(client);

point
	.getPaymentIntentList({
		filters: {
			startDate: '2023-01-01',
			endDate: '2023-12-31',
		},
	})
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
