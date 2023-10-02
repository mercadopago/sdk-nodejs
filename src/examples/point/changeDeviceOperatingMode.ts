import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Change Device Operating Mode.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_device-id/patch Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 }, });

const point = new Point(client);

point
	.changeDeviceOperatingMode({
		device_id: '<DEVICE_ID>',
		request: {
			operating_mode: '<OPERATING_MODE>',
		},
	}).then(console.log).catch(console.log);
