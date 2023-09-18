import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Change Device Operating Mode.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_device-id/patch Documentation }.
 */
const client = new MercadoPago({
	accessToken: 'access_token',
	options: { timeout: 5000 },
});

const point = new Point(client);

point
	.changeDeviceOperatingMode({
		device_id: '123456789',
		request: {
			operating_mode: 'PDV',
		},
	})
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
