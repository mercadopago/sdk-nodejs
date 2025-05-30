import MercadoPago, { Chargeback } from '@src/index';

/**
 * Mercado Pago Chargeback Search.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const chargeback = new Chargeback(client);

chargeback.search({
	options: {
		payment_id: '<PAYMENT_ID>',
		limit: 10,
		offset: 0
	}
}).then(console.log).catch(console.log); 