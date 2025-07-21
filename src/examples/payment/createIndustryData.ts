/**
 * Mercado Pago Payment with Industry Data.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post Documentation }.
 */

import MercadoPago, { Payment } from '../../index';

const client = new MercadoPago({
	accessToken: '{{ACCESS_TOKEN}}',
	options: { timeout: 5000 },
});

const payment = new Payment(client);

payment
	.create({
		body: {
			transaction_amount: 120.34,
			description: 'Product title',
			payment_method_id: 'pix',
			binary_mode: true,
			capture: true,
			external_reference: 'external_reference',
			metadata: {
				orderNumber: '123456',
			},
			notification_url: '{{URL}}',
			statement_descriptor: 'Statement descriptor',
			payer: {
				email: '{{PAYER_EMAIL}}',
				first_name: 'Name',
				last_name: 'Surname',
				identification: {
					type: 'CPF',
					number: '{{DOC_NUMBER}}',
				},
				phone: {
					area_code: '{{CODE}}',
					number: '{{PHONE_NUMBER}}',
				},
				address: {
					street_name: 'Av. das Nações Unidas',
					street_number: '99',
					zip_code: '{{CODE}}',
				},
			},
			forward_data: {
				sub_merchant: {
					sub_merchant_id: '123456789',
					mcc: '1234',
					country: 'BR',
					address_door_number: 123,
					zip: '{{CODE}}',
					document_number: '{{DOC_NUMBER}}',
					city: 'São Paulo',
					address_street: 'Av. das Nações Unidas',
					legal_name: 'Sub-merchant name',
					region_code_iso: 'BR-SP',
					region_code: 'SP',
					document_type: 'CPF',
					phone: '{{PHONE_NUMBER}}',
					url: 'https://www.mercadopago.com.br',
				},
			},
			additional_info: {
				items: [
					{
						id: '1234',
						title: 'Product title',
						description: 'Product description',  
						picture_url: 'https://www.mercadopago.com.br/picture.jpg',
						category_id: '1234',
						quantity: 1,
						unit_price: 120.34,
						warranty: true,
						category_descriptor: {
							passenger: {
								first_name: 'Name',
								last_name: 'Surname',
								identification: {
									type: 'CPF',
									number: '{{DOC_NUMBER}}',
								},
							},
							route: {
								departure: 'São Paulo',
								company: 'Companhia Aérea',
								arrival_date_time: '2023-01-01T00:00:00Z',
								departure_date_time: '2023-01-01T00:00:00Z',
								destination: 'Rio de Janeiro',
							},
						},
					},
				],
				payer: {
					first_name: 'Name',
					last_name: 'Surname',
					is_prime_user: true,
					is_first_purchase_online: true,
					registration_date: '2023-01-01T00:00:00Z',
					last_purchase: '2023-01-01T00:00:00Z',
					authentication_type: 'Gmail',
					phone: {
						area_code: '{{CODE}}',
						number: '{{PHONE_NUMBER}}',
					},
					address: {
						street_name: 'Av. das Nações Unidas',
						street_number: '99',
						zip_code: '{{CODE}}',
					},
				},
				shipments: {
					local_pickup: true,
					express_shipment: true,
					receiver_address: {
						zip_code: '{{CODE}}',
						street_name: 'Av. das Nações Unidas',
						street_number: '99',
						floor: '5',
						apartment: 'A',
						city_name: 'São Paulo',
						state_name: 'SP',
					},
				},
			},
		},
		requestOptions: {
			idempotencyKey: '{{UNIQUE_IDEMPOTENCY_KEY}}',
		},
	})
	.then(console.log)
	.catch(console.log);
