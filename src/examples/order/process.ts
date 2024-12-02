/**
 * Mercado Pago Process Order.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
  */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

const orderId = '<ORDER_ID>';

order.process({
	id: orderId,
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);