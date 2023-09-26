/**
 * To know the possible parameters, go to the payments section and then to search payments
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments_search/get Documentation }.
 */

import MercadoPago, { Payment } from '@src/index';

const client = new MercadoPago({ accessToken: 'APP_USR-4679935697572392-071411-ed200b57e5c38354adc3f4f6156c2f82-1273205088' });

const payments = new Payment(client);

payments.search({ criteria: 'asc' }, { corporationId: 'corporationId', idempotencyKey: 'idepotency', integratorId: 'integrator', plataformId: 'platsformid' }).then(console.log).catch(console.log);
