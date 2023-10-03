/**
 * To know the possible parameters, go to the payments section and then to search payments
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments_search/get Documentation }.
 */

import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const payments = new Payment(client);

payments.search().then(console.log).catch(console.log);
