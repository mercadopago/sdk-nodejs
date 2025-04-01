/**
 * Mercado Pago Create Order transaction.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/order/online-payments/add-transaction/post Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

order.createTransaction({
	id: '<ORDER_ID>',
	body: {
		payments: [
			{
				amount: '100.00',
				payment_method: {
					id: 'master',
					type: 'credit_card',
					token: '<CARD_TOKEN>',
					installments: 1,
				}
			}
		]
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);
