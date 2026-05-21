/**
 * Mercado Pago Create Order.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/orders/online-payments/create/post Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

order.create({
	body: {
		type: 'online',
		processing_mode: 'automatic',
		capture_mode: 'automatic_async',
		total_amount: '1000.00',
		external_reference: 'ext_ref_1234',
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
		description: 'some description',
		payer: {
			entity_type: 'individual',
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
				street_number: '99',
				zip_code: '00000000',
				city: 'Osasco',
				state: 'SP',
				neighborhood: 'Bonfim',
				complement: 'complement',
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
				category_id: 'category_id',
				picture_url: 'https://mysite.com/img/item.jpg',
				external_code: 'external_code',
				type: 'item type',
				warranty: false,
			}
		],
		expiration_time: 'P3D'
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);
