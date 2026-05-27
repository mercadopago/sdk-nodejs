/**
 * Mercado Pago Customer card get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/online-payments/checkout-api/customers/get-customer/get Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.get({ customerId: '<CUSTOMER_ID>' }).then(console.log).catch(console.log);
