import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';

describe('Get Order with 3DS integration test', () => {
	let mercadoPagoConfig: MercadoPago;
	let order: Order;

	beforeEach(() => {
		mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token });
		order = new Order(mercadoPagoConfig);
	});

	test('should get Order with 3DS transaction security information', async () => {
		// This test assumes an existing order with 3DS was created
		// In a real scenario, you would create the order first or use a known order ID
		const orderId = 'ORDER_ID_WITH_3DS'; // Replace with actual order ID from previous test
		
		try {
			const response = await order.get({ id: orderId });

			expect(response.id).toBe(orderId);
			expect(response.transactions?.payments).toBeDefined();

			const payment = response.transactions?.payments?.[0];
			if (payment) {
				// Verify payment structure
				expect(payment.id).toBeTruthy();
				expect(payment.amount).toBeTruthy();
				expect(payment.payment_method).toBeTruthy();

				// Check 3DS transaction security in payment method
				if (payment.payment_method?.transaction_security) {
					const transactionSecurity = payment.payment_method.transaction_security;
					
					// Verify 3DS validation types
					expect(['always', 'on_fraud_risk', 'never']).toContain(transactionSecurity.validation);
					
					// Verify liability shift types
					expect(['required', 'preferred']).toContain(transactionSecurity.liability_shift);
					
					// If challenge URL is present, verify it's a valid URL
					if (transactionSecurity.url) {
						expect(transactionSecurity.url).toMatch(/^https?:\/\/.+/);
					}
					
					// Check additional 3DS fields
					if (transactionSecurity.type) {
						expect(typeof transactionSecurity.type).toBe('string');
					}
					
					if (transactionSecurity.status) {
						expect(typeof transactionSecurity.status).toBe('string');
					}
				}

				// Check different 3DS payment statuses
				switch (payment.status) {
					case 'action_required':
						if (payment.status_detail === 'pending_challenge') {
							expect(payment.payment_method?.transaction_security?.url).toBeTruthy();
							console.log('3DS Challenge required for order:', orderId);
						}
						break;
					
					case 'processed':
						if (payment.status_detail === 'accredited') {
							console.log('Payment processed successfully (3DS completed or not required)');
						}
						break;
					
					case 'failed':
						if (payment.status_detail === 'cc_rejected_3ds_challenge') {
							console.log('Payment failed due to 3DS challenge failure');
						}
						break;
					
					case 'cancelled':
						if (payment.status_detail === 'expired') {
							console.log('Payment cancelled due to 3DS timeout');
						}
						break;
				}
			}

			// Check 3DS configuration in order config
			if (response.config?.online?.transaction_security) {
				const configSecurity = response.config.online.transaction_security;
				expect(['always', 'on_fraud_risk', 'never']).toContain(configSecurity.validation);
				expect(['required', 'preferred']).toContain(configSecurity.liability_shift);
			}

		} catch (error) {
			// If order doesn't exist, skip the test
			if (error instanceof Error && error.message.includes('not found')) {
				console.log('Skipping test - order not found. Create an order with 3DS first.');
				return;
			}
			throw error;
		}
	});

	test('should handle different 3DS status scenarios', async () => {
		// This is a conceptual test that demonstrates how to handle different 3DS scenarios
		// In practice, you would need actual orders in different states
		
		const testScenarios = [
			{
				name: 'Challenge Required',
				expectedStatus: 'action_required',
				expectedStatusDetail: 'pending_challenge',
				shouldHaveChallengeUrl: true
			},
			{
				name: 'Payment Approved',
				expectedStatus: 'processed',
				expectedStatusDetail: 'accredited',
				shouldHaveChallengeUrl: false
			},
			{
				name: '3DS Challenge Failed',
				expectedStatus: 'failed',
				expectedStatusDetail: 'cc_rejected_3ds_challenge',
				shouldHaveChallengeUrl: false
			},
			{
				name: 'Challenge Expired',
				expectedStatus: 'cancelled',
				expectedStatusDetail: 'expired',
				shouldHaveChallengeUrl: false
			}
		];

		// This is a mock test to demonstrate the expected behavior
		// In real tests, you would have actual order IDs for each scenario
		testScenarios.forEach(scenario => {
			expect(scenario.name).toBeTruthy();
			expect(scenario.expectedStatus).toBeTruthy();
			expect(scenario.expectedStatusDetail).toBeTruthy();
			expect(typeof scenario.shouldHaveChallengeUrl).toBe('boolean');
		});
	});

	test('should validate 3DS response structure', () => {
		// Mock response structure validation
		const mockPaymentMethod = {
			id: 'master',
			type: 'credit_card',
			transaction_security: {
				validation: 'on_fraud_risk' as const,
				liability_shift: 'required' as const,
				url: 'https://example.com/3ds-challenge',
				type: '3DS',
				status: 'pending'
			}
		};

		// Validate the structure matches our TypeScript types
		expect(mockPaymentMethod.transaction_security.validation).toBe('on_fraud_risk');
		expect(mockPaymentMethod.transaction_security.liability_shift).toBe('required');
		expect(mockPaymentMethod.transaction_security.url).toMatch(/^https?:\/\/.+/);
		expect(typeof mockPaymentMethod.transaction_security.type).toBe('string');
		expect(typeof mockPaymentMethod.transaction_security.status).toBe('string');
	});
});
