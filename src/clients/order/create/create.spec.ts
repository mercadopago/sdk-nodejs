import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderCreateClient, CreateOrderRequest } from './types';
import create from '.';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

jest.mock('@utils/restClient');

describe('Create Order', () => {
	test('should create Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1,
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
	});
});



describe('Create Order', () => {
	test('should support payment_method.id = "boleto" in request and response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'boleto',
							type: 'ticket',
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			transactions: {
				payments: [
					{
						payment_method: {
							id: 'boleto',
							type: 'ticket'
						}
					}
				]
			},
			status: 'processed'
		});

		const response = await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);

		expect(response.transactions.payments[0].payment_method.id).toBe('boleto');
	});
});

describe('Create Order', () => {
	test('should support capture_mode = "automatic_async" in request and response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			capture_mode: 'automatic_async',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			capture_mode: 'automatic_async',
			status: 'processed'
		});

		const response = await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);

		expect(response.capture_mode).toBe('automatic_async');
	});
});

describe('Create Order', () => {
	test('should support additional_info.payer.authentication_type in request', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1
						}
					}
				]
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'processed' });

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({ body: expect.stringContaining('"authentication_type":"senha"')
			})
		);
	});
});

describe('Create Order — Checkout PRO', () => {
	test('should create a Checkout PRO order with type="online" and processing_mode="manual"', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			capture_mode: 'automatic',
			total_amount: '500.00',
			external_reference: 'ORDER-1234',
			description: 'Travel package SAO-RIO',
			expiration_time: 'P1D',
			payer: {
				email: createEmailTestUser(),
				first_name: 'John',
				last_name: 'Smith',
			},
			config: {
				statement_descriptor: 'MYSTORE',
				online: {
					success_url: 'https://example.com/success',
					failure_url: 'https://example.com/failure',
					pending_url: 'https://example.com/pending',
					auto_return: 'approved',
				},
				payment_method: {
					max_installments: 12,
					not_allowed_ids: ['amex'],
					not_allowed_types: ['ticket'],
				},
			},
			items: [
				{
					title: 'Flight SAO-RIO',
					unit_price: '500.00',
					quantity: 1,
				}
			],
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({
			id: 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			type: 'online',
			processing_mode: 'manual',
			status: 'created',
			checkout_url: 'https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			client_token: 'eyJhbGciOiJSUzI1NiIs...',
			currency: 'BRL',
		});

		const response = await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders', {
			body: JSON.stringify(mockBody),
			headers: { Authorization: 'Bearer access_token' },
			method: 'POST',
			timeout: 5000,
		});

		expect(response.checkout_url).toBe('https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9');
		expect(response.client_token).toBe('eyJhbGciOiJSUzI1NiIs...');
		expect(response.status).toBe('created');
		expect(response.processing_mode).toBe('manual');
	});
});

describe('Create Order — Checkout PRO', () => {
	test('should support config.online.tracks with google_ad and facebook_ad pixels', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '100.00',
			payer: { email: createEmailTestUser() },
			config: {
				online: {
					success_url: 'https://example.com/success',
					tracks: [
						{
							type: 'google_ad',
							values: { conversion_id: '111', conversion_label: 'LABEL' }
						},
						{
							type: 'facebook_ad',
							values: { pixel_id: '222' }
						}
					]
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'created' });

		await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"conversion_id":"111"')
			})
		);
		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"pixel_id":"222"')
			})
		);
	});
});

describe('Create Order — Checkout PRO', () => {
	test('should support config.payment_method.installments.interest_free with range type', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '500.00',
			payer: { email: createEmailTestUser() },
			config: {
				payment_method: {
					max_installments: 12,
					installments: {
						interest_free: {
							type: 'range',
							values: [2, 6]
						}
					}
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({
			status: 'created',
			config: {
				payment_method: {
					max_installments: 12,
					installments: { interest_free: { type: 'range', values: [2, 6] } }
				}
			}
		});

		const response = await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"interest_free"')
			})
		);
		expect(response.config.payment_method.installments.interest_free.type).toBe('range');
		expect(response.config.payment_method.installments.interest_free.values).toEqual([2, 6]);
	});
});

describe('Create Order — Checkout PRO', () => {
	test('should support shipment with mode, cost, and full address including floor and apartment', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '515.00',
			payer: { email: createEmailTestUser() },
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
					city: 'São Paulo',
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'created' });

		await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"floor":"3"')
			})
		);
		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"apartment":"B"')
			})
		);
	});
});
