import MercadoPago, { Payment } from '@src/index';

/**
 * Mercado Pago Payment Update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const payment = new Payment(client);

payment.update({
	id: '<PAYMENT_ID>',
	body: {
		status: 'cancelled',
		description: 'Payment cancelled by user',
		metadata: {
			reason: 'customer_request'
		}
	}
}).then(console.log).catch(console.log); 