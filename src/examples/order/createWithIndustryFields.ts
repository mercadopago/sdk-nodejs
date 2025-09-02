/**
 * Mercado Pago Create Order with industry fields.
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
		expiration_time: 'P3D',
		additional_info: {
			'payer.authentication_type': 'MOBILE',
			'payer.registration_date': '2024-01-01T00:00:00',
			'payer.is_prime_user': true,
			'payer.is_first_purchase_online': true,
			'payer.last_purchase': '2024-01-01T00:00:00',
			'shipment.express': true,
			'shipment.local_pickup': true,
			'platform.shipment.delivery_promise': 'true',
			'platform.shipment.drop_shipping': 'true',
			'platform.shipment.safety': 'true',
			'platform.shipment.tracking.code': 'true',
			'platform.shipment.tracking.status': 'true',
			'platform.shipment.withdrawn': true,
			'platform.seller.id': '123456',
			'platform.seller.name': 'Example Seller',
			'platform.seller.email': 'seller@example.com',
			'platform.seller.status': 'Active',
			'platform.seller.referral_url': 'https://example.com',
			'platform.seller.registration_date': '2020-01-01T00:00:00.000-03:00',
			'platform.seller.hired_plan': 'Premium',
			'platform.seller.business_type': 'E-commerce',
			'platform.seller.address.zip_code': '01310-000',
			'platform.seller.address.street_name': 'Av. Paulista',
			'platform.seller.address.street_number': '100',
			'platform.seller.address.city': 'São Paulo',
			'platform.seller.address.state': 'SP',
			'platform.seller.address.complement': '101',
			'platform.seller.address.country': 'Brasil',
			'platform.seller.identification.type': 'CNPJ',
			'platform.seller.identification.number': '12.345.678/0001-99',
			'platform.seller.phone.number': '987654321',
			'platform.seller.phone.area_code': '11',
			'platform.authentication': 'string',
			'travel.passengers': [
				{
					first_name: 'jose da silva',
					last_name: 'ferreira',
					identification: {
						type: 'CPF',
						number: '11111111111'
					}
				}
			],
			'travel.routes': [
				{
					departure: 'GRU',
					destination: 'CWB',
					departure_date_time: '2020-01-01T00:00:00.000-03:00',
					arrival_date_time: '2020-01-01T00:00:00.000-03:00',
					company: 'gol'
				},
				{
					departure: 'GRU',
					destination: 'CWB',
					departure_date_time: '2020-01-01T00:00:00.000-03:00',
					arrival_date_time: '2020-01-01T00:00:00.000-03:00',
					company: 'azul'
				}
			]
		}
	},
	requestOptions: {
		idempotencyKey: '<IDEMPOTENCY_KEY>'
	}
}).then(console.log).catch(console.error);
