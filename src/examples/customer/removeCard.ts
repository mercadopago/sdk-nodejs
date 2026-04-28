/**
 * Mercado Pago Customer card remove.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/cards/delete-card/delete Documentation }.
*/
import MercadoPago, { Customer } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const customerClient = new Customer(client);

customerClient.removeCard({ customerId: '<CUSTOMER_ID>', cardId: '<CARD_ID>' }).then(console.log).catch(console.log);
