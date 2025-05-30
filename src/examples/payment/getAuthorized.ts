import MercadoPago, { Payment } from '@src/index';

/**
 * Mercado Pago Payment Get Authorized.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const payment = new Payment(client);

payment.getAuthorized({
	id: '<PAYMENT_ID>'
}).then(console.log).catch(console.log); 