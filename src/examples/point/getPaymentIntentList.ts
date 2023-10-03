import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent List.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_deviceid_payment-intents_paymentintentid/delete Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const point = new Point(client);

point
	.getPaymentIntentList({ body: {
		options: {
			startDate: '<START_DATE>',
			endDate: '<START_DATE>',
		},
	} }).then(console.log).catch(console.log);
