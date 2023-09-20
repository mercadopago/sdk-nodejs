/**
 * To know the possible parameters, go to the payments section and then to search payments
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments_search/get Documentation }.
 */

import MercadoPago, { Payments } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const payments = new Payments(client);

payments.search({
	external_reference: '<EXTERNAL_REFERENCE>',
}).then(console.log).catch(console.log);
