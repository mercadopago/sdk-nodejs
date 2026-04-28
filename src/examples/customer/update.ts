/**
 * Mercado Pago Customer card update.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/online-payments/checkout-api/customers/update-customer/put Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.update({ customerId: '<CUSTOMER_ID>', body: {
	first_name: '<FIRST_NAME>'
},
}).then(console.log).catch(console.log);
