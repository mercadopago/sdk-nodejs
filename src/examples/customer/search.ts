/**
 * Mercado Pago Customer card list.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/online-payments/checkout-api/customers/search-customer/get Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.search({ options: { email: '<EMAIL>' } }).then(console.log).catch(console.log);
