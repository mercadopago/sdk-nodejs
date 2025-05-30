import MercadoPago, { Payment } from '@src/index';

/**
 * Mercado Pago Payment Search Authorized.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const payment = new Payment(client);

payment.searchAuthorized({
	options: {
		limit: 50,
		offset: 0,
		sort: 'date_created',
		criteria: 'desc'
	}
}).then(console.log).catch(console.log); 