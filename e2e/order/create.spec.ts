import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('Create Order integration test', () => {
	test('should create Order successfully', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token, options: { timeout: 10000 } });
		const order = new Order(mercadoPagoConfig);
		
		// Criar card token primeiro, seguindo padrão dos outros testes que passaram
		const cardTokenResponse = await createCardToken(config.access_token);
		const token = cardTokenResponse.id;
		const email = createEmailTestUser();
		
		// Usar external_reference único baseado no padrão do SDK PHP
		const external_reference = `ext_ref_${Date.now()}`;

		const body: OrderCreateData = {
			body: {
				type: 'online',
				processing_mode: 'automatic', // Adicionar processing_mode
				total_amount: '200.00',
				external_reference: external_reference,
				transactions: {
					payments: [
						{
							amount: '200.00',
							payment_method: {
								id: 'master',  // Usar master card em vez de PIX
								type: 'credit_card',  // credit_card em vez de bank_transfer
								token: token,  // Adicionar token do card
								installments: 1  // Adicionar installments
							},
						},
					],
				},
				payer: {
					email: email,  // Usar email dinâmico
				},
			},
		};

		const response = await order.create(body);

		// Verificar que a Order foi criada com sucesso
		expect(response.id).toBeTruthy();
		expect(response.type).toBe('online');
		expect(response.total_amount).toBe('200.00');
		expect(response.external_reference).toBe(external_reference);
		
		// Verificar que não está em status failed
		expect(response.status).not.toBe('failed');
		
		// Verificar transações
		expect(response.transactions).toBeDefined();
		expect(response.transactions.payments).toBeDefined();
		expect(response.transactions.payments.length).toBeGreaterThan(0);
		expect(response.transactions.payments[0].amount).toBe('200.00');
		expect(response.transactions.payments[0].payment_method.id).toBe('master');
		expect(response.transactions.payments[0].payment_method.type).toBe('credit_card');

		// Verificar propriedades opcionais que podem estar presentes
		if (response.processing_mode) {
			expect(response.processing_mode).toEqual(expect.any(String));
		}
		if (response.payer) {
			expect(response.payer).toEqual(expect.any(Object));
			// PayerResponse em Order só tem customer_id, não email
			if (response.payer.customer_id) {
				expect(response.payer.customer_id).toEqual(expect.any(String));
			}
		}
	}, 15000); // Timeout de 15 segundos
});
