/**
 * Mercado Pago MerchantOrder get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/get Documentation }.
*/
import MercadoPago, { MerchantOrder } from '@src/index';

const client = new MercadoPago({ accessToken: 'ACCESS_TOKEN' });
const customerClient = new MerchantOrder(client);

customerClient.get({ merchantOrderId: '<MERCHANT_ORDER_ID>' }).then(console.log).catch(console.log);
