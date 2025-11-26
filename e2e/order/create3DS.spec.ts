import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';

describe('Create Order with 3DS integration test', () => {
	let mercadoPagoConfig: MercadoPago;
	let order: Order;

	beforeEach(() => {
		mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		order = new Order(mercadoPagoConfig);
	});

	test('should create Order with 3DS on_fraud_risk validation', async () => {
		const body: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '150.00',
				external_reference: '3ds_test_fraud_risk',
				config: {
					online: {
						transaction_security: {
							validation: 'on_fraud_risk',
							liability_shift: 'required'
						}
					}
				},
				transactions: {
					payments: [
						{
							amount: '150.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: 'CARD_TOKEN', // This should be replaced with a valid test token
								installments: 1
							}
						}
					]
				},
				payer: {
					email: 'test_3ds@testuser.com',
					identification: {
						type: 'CPF',
						number: '12345678901'
					}
				}
			}
		};

		const response = await order.create(body);

		expect(response.id).toBeTruthy();
		expect(response.type).toBe('online');
		expect(response.total_amount).toBe('150.00');
		expect(response.external_reference).toBe('3ds_test_fraud_risk');
		
		// Verify 3DS configuration
		expect(response.config?.online?.transaction_security?.validation).toBe('on_fraud_risk');
		expect(response.config?.online?.transaction_security?.liability_shift).toBe('required');
		
		// Verify payment structure
		const payment = response.transactions?.payments?.[0];
		expect(payment).toBeTruthy();
		expect(payment?.amount).toBe('150.00');
		expect(payment?.payment_method?.id).toBe('master');
		expect(payment?.payment_method?.type).toBe('credit_card');
		
		// Check if 3DS transaction security is present in payment method
		if (payment?.payment_method?.transaction_security) {
			expect(payment.payment_method.transaction_security.validation).toBe('on_fraud_risk');
			expect(payment.payment_method.transaction_security.liability_shift).toBe('required');
		}
	});

	test('should create Order with 3DS always validation', async () => {
		const body: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '200.00',
				external_reference: '3ds_test_always',
				config: {
					online: {
						transaction_security: {
							validation: 'always',
							liability_shift: 'preferred'
						}
					}
				},
				transactions: {
					payments: [
						{
							amount: '200.00',
							payment_method: {
								id: 'visa',
								type: 'credit_card',
								token: 'CARD_TOKEN', // This should be replaced with a valid test token
								installments: 1
							}
						}
					]
				},
				payer: {
					email: 'test_3ds_always@testuser.com',
					identification: {
						type: 'CPF',
						number: '12345678901'
					}
				}
			}
		};

		const response = await order.create(body);

		expect(response.id).toBeTruthy();
		expect(response.config?.online?.transaction_security?.validation).toBe('always');
		expect(response.config?.online?.transaction_security?.liability_shift).toBe('preferred');
	});

	test('should create Order with 3DS never validation', async () => {
		const body: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '100.00',
				external_reference: '3ds_test_never',
				config: {
					online: {
						transaction_security: {
							validation: 'never',
							liability_shift: 'required'
						}
					}
				},
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: 'CARD_TOKEN', // This should be replaced with a valid test token
								installments: 1
							}
						}
					]
				},
				payer: {
					email: 'test_3ds_never@testuser.com',
					identification: {
						type: 'CPF',
						number: '12345678901'
					}
				}
			}
		};

		const response = await order.create(body);

		expect(response.id).toBeTruthy();
		expect(response.config?.online?.transaction_security?.validation).toBe('never');
		
		// With 'never' validation, payment should be processed directly without 3DS
		const payment = response.transactions?.payments?.[0];
		expect(payment?.status).toBeDefined();
	});

	test('should handle 3DS challenge response correctly', async () => {
		// First create an order that might require 3DS challenge
		const createBody: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'automatic',
				total_amount: '150.00',
				external_reference: '3ds_challenge_test',
				config: {
					online: {
						transaction_security: {
							validation: 'on_fraud_risk',
							liability_shift: 'required'
						}
					}
				},
				transactions: {
					payments: [
						{
							amount: '150.00',
							payment_method: {
								id: 'master',
								type: 'credit_card',
								token: 'CARD_TOKEN', // Use test token that triggers challenge
								installments: 1
							}
						}
					]
				},
				payer: {
					email: 'test_3ds_challenge@testuser.com',
					identification: {
						type: 'CPF',
						number: '12345678901'
					}
				}
			}
		};

		const createResponse = await order.create(createBody);
		expect(createResponse.id).toBeTruthy();

		// Get the order to check final status
		const getResponse = await order.get({ id: createResponse.id! });
		
		expect(getResponse.id).toBe(createResponse.id);
		expect(getResponse.transactions?.payments).toBeDefined();
		
		const payment = getResponse.transactions?.payments?.[0];
		expect(payment).toBeTruthy();
		
		// Verify that 3DS information is preserved in the response
		if (payment?.payment_method?.transaction_security) {
			expect(['always', 'on_fraud_risk', 'never']).toContain(
				payment.payment_method.transaction_security.validation
			);
			expect(['required', 'preferred']).toContain(
				payment.payment_method.transaction_security.liability_shift
			);
		}
		
		// Check possible 3DS statuses
		if (payment?.status === 'action_required' && payment?.status_detail === 'pending_challenge') {
			// 3DS challenge is required
			expect(payment.payment_method?.transaction_security?.url).toBeTruthy();
			console.log('3DS Challenge URL:', payment.payment_method?.transaction_security?.url);
		} else if (payment?.status === 'processed') {
			// Payment was processed without challenge or after successful challenge
			expect(payment.status_detail).toBeDefined();
		}
	});
});
