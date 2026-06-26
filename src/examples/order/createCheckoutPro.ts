/**
 * Mercado Pago Create Order — Checkout PRO flow.
 *
 * Creates an online order and redirects the buyer to the Checkout PRO
 * payment page via the `checkout_url` returned in the response.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/online-payments/checkout-pro/create-order/post Documentation}
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

order.create({
	body: {
		type: 'online',
		processing_mode: 'manual',
		capture_mode: 'automatic',
		total_amount: '500.00',
		external_reference: 'ORDER-1234',
		description: 'Travel package SAO-RIO with insurance',
		expiration_time: 'P1D',
		marketplace_fee: '5.00',
		payer: {
			email: 'buyer@testuser.com',
			first_name: 'John',
			last_name: 'Smith',
			phone: {
				area_code: '11',
				number: '999998888'
			},
			identification: {
				type: 'CPF',
				number: '12345678909'
			},
			address: {
				zip_code: '01310-100',
				street_name: 'Av. Paulista',
				street_number: '1000',
				neighborhood: 'Bela Vista',
				city: 'São Paulo'
			}
		},
		shipment: {
			mode: 'custom',
			local_pickup: false,
			cost: '15.00',
			free_shipping: false,
			free_methods: [{ id: 73328 }],
			address: {
				zip_code: '01310-100',
				street_name: 'Av. Paulista',
				street_number: '1000',
				floor: '3',
				apartment: 'B',
				neighborhood: 'Bela Vista',
				city: 'São Paulo'
			}
		},
		config: {
			statement_descriptor: 'MYSTORE',
			default_payment_due_date: 'P1D',
			online: {
				available_from: '2026-01-01T00:00:00Z',
				allowed_user_type: 'account_only',
				success_url: 'https://example.com/success',
				failure_url: 'https://example.com/failure',
				pending_url: 'https://example.com/pending',
				auto_return: 'approved',
				tracks: [
					{
						type: 'google_ad',
						values: {
							conversion_id: '21312312312123',
							conversion_label: 'TEST'
						}
					},
					{
						type: 'facebook_ad',
						values: {
							pixel_id: '21312312312123'
						}
					}
				]
			},
			payment_method: {
				max_installments: 12,
				not_allowed_ids: ['amex'],
				not_allowed_types: ['ticket'],
				installments: {
					interest_free: {
						type: 'range',
						values: [2, 6]
					}
				}
			}
		},
		items: [
			{
				external_code: 'ITEM-001',
				title: 'Flight SAO-RIO',
				description: 'Round trip, economy class',
				category_id: 'travels',
				picture_url: 'https://example.com/img.jpg',
				quantity: 1,
				unit_price: '450.00',
				type: 'travel',
				event_date: '2027-01-15T00:00:00.000-03:00'
			},
			{
				external_code: 'ITEM-002',
				title: 'Travel insurance',
				description: 'Basic coverage during trip',
				category_id: 'travels',
				picture_url: 'https://example.com/insurance.jpg',
				quantity: 1,
				unit_price: '50.00',
				type: 'travel',
				event_date: '2027-01-15T00:00:00.000-03:00'
			}
		],
		additional_info: {
			'payer.registration_date': '2020-01-15T00:00:00.000-03:00',
			'payer.authentication_type': 'MOBILE',
			'payer.is_prime_user': true,
			'payer.is_first_purchase_online': true,
			'payer.last_purchase': '2025-12-01T00:00:00.000-03:00',
			'travel.passengers': [
				{
					first_name: 'John',
					last_name: 'Smith',
					identification_type: 'CPF',
					identification_number: '12345678909',
					item_references: ['ITEM-001']
				}
			],
			'travel.routes': [
				{
					departure: 'SAO',
					destination: 'RIO',
					departure_date_time: '2026-03-10T08:00:00.000-03:00',
					arrival_date_time: '2026-03-10T09:00:00.000-03:00',
					company: 'TAM',
					item_references: ['ITEM-001']
				}
			]
		}
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(response => {
	// Redirect the buyer to the Checkout PRO payment page
	console.log('Checkout PRO URL:', response.checkout_url);
	console.log('Order ID:', response.id);
	console.log('Order status:', response.status);
}).catch(console.error);
