/**
 * Mercado Pago Create Order.
 *
 * @see {@link [TODO: insert Order documentation URL] Documentation }.
  */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

// full order example
order.create({
	body: {
		type: 'online',
		total_amount: '1000.00',
		external_reference: 'ext_ref_1234',
		type_config: {
			capture_mode: 'automatic'
		},
		transactions: {
			payments: [
				{
					amount: '1000.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						token: '<CARD_TOKEN>',
						installments: 1,
						statement_descriptor: 'Store name'
					}
				}
			]
		},
		processing_mode: 'automatic',
		description: 'some description',
		payer: {
			email: '<PAYER_EMAIL>',
			first_name: 'John',
			last_name: 'Doe',
			identification: {
				type: 'CPF',
				number: '00000000000'
			},
			phone: {
				area_code: '55',
				number: '99999999999'
			},
			address: {
				street_name: 'Av. das Nações Unidas',
				street_number: '99'
			}
		},
		marketplace: 'NONE',
		marketplace_fee: '10.00',
		items: [
			{
				title: 'Some item title',
				unit_price: '1000.00',
				quantity: 1,
				description: 'Some item description',
				id: 'item_id',
				category_id: 'category_id',
				picture_url: 'https://mysite.com/img/item.jpg'
			}
		],
		expiration_time: 'P3D'
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);
