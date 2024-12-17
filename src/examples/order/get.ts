/**
 * Mercado Pago Get Order.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/order/online-payments/get-order/get Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

const orderId = '<ORDER_ID>';
order.get({ id: orderId }).then(console.log).catch(console.error);
