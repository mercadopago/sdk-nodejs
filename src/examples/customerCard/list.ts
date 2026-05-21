/**
 * Mercado Pago Customer card remove.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/get Documentation }.
*/
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new CustomerCard(client);

customerClient.list({ customerId: '<CUSTOMER_UD>' }).then(console.log).catch(console.log);
