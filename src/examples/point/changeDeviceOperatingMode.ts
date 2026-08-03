import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Change Device Operating Mode.
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/reference/in-person-payments/point/terminals/update-operation-mode/patch Documentation }.
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
