/**
 * Mercado Pago Customer card list.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-pro/merchant_orders/search-merchant-order/get Documentation }.
*/
import MercadoPago, { MerchantOrder } from '@src/index';

const client = new MercadoPago({ accessToken: 'ACCESS_TOKEN' });
const customerClient = new MerchantOrder(client);

customerClient.search({ options: { application_id: '<APPLICATION_ID>' } }).then(console.log).catch(console.log);
