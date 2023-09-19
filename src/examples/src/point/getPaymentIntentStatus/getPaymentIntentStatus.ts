import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent Status.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_payment-intents_paymentintentid_events/get Documentation }.
 */
const client = new MercadoPago({
	accessToken: 'access_token',
	options: { timeout: 5000 },
});

const point = new Point(client);
const payment_intent_id = '123456789';

point
	.getPaymentIntentStatus(payment_intent_id)
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
