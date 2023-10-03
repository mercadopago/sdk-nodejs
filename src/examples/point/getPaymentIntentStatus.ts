import MercadoPago, { Point } from '@src/index';

/**
 * Mercado Pago Get Payment Intent Status.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_payment-intents_paymentintentid_events/get Documentation }.
 */
const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>',options: { timeout: 5000 } });

const point = new Point(client);

point
	.getPaymentIntentStatus({ payment_intent_id: '<PAYMENT_INTENT_ID>' }).then(console.log).catch(console.log);
