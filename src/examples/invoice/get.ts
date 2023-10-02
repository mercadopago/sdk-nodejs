import MercadoPago, { Invoice } from '@src/index';

/**
 * Mercado Pago Invoice .
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/subscriptions/_authorized_payments_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const invoice = new Invoice(client);

invoice.get({ id: '1234' }).then(console.log).catch(console.log);
