/**
 * To know the possible parameters, go to the payments section and then to search payments
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference Documentation }.
 */

import MercadoPago, { Payments } from '@src/index';

const client = new MercadoPago({ accessToken: 'APP_USR-1503858983807072-071216-eddb4ebd12c20a125107fabe4aca88de-248724191' });

const payments = new Payments(client);

payments.search({
	criteria: 'asc'
}).then((result) => console.log(result.results[0]));
