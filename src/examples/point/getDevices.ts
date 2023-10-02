import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Devices.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices/get Documentation }.
 */
const client = new MercadoPago({
	accessToken: '<ACCESS_TOKEN>',
	options: { timeout: 5000 },
});

const point = new Point(client);

const request = {
	options: {
		store_id: '<STORE_ID>',
		pos_id: '<POS_ID>',
		limit: 10,
		offset: 0,
	},
};

point
	.getDevices({ request }).then(console.log).catch(console.log);
