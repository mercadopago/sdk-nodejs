import MercadoPago from '@src/index';
import { config } from '../e2e.config';
import { Order } from '@src/clients/order';
import { OrderCreateData } from '@src/clients/order/create/types';
import { createCardToken } from '@src/mocks/createCardToken';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

describe('Get Order integration test', () => {
	test('should get an Order by Id', async () => {
		const mercadoPagoConfig = new MercadoPago({ accessToken: config.access_token, options: { timeout: 10000 } });
		const orderClient = new Order(mercadoPagoConfig);
		
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

		// Criar a Order
		const order = await orderClient.create(body);
		expect(order.id).toBeTruthy();
		expect(order.status).not.toBe('failed');
		
		const orderId = order.id;
		
		// Buscar a Order criada
		const getOrder = await orderClient.get({ id: orderId });

		// Verificar que os dados do GET coincidem com o que foi criado
		expect(getOrder.id).toBe(orderId);
		expect(getOrder.type).toBe('online');
		expect(getOrder.total_amount).toBe('200.00');
		expect(getOrder.external_reference).toBe(external_reference);
		
		// Verificar transações
		expect(getOrder.transactions).toBeDefined();
		expect(getOrder.transactions.payments).toBeDefined();
		expect(getOrder.transactions.payments.length).toBeGreaterThan(0);
		expect(getOrder.transactions.payments[0].amount).toBe('200.00');
		expect(getOrder.transactions.payments[0].payment_method.id).toBe('master');
		expect(getOrder.transactions.payments[0].payment_method.type).toBe('credit_card');

		// Verificar propriedades opcionais que podem estar presentes
		if (getOrder.processing_mode) {
			expect(getOrder.processing_mode).toEqual(expect.any(String));
		}
		if (getOrder.status) {
			expect(getOrder.status).toEqual(expect.any(String));
		}
		if (getOrder.payer) {
			expect(getOrder.payer).toEqual(expect.any(Object));
		}
	}, 15000); // Timeout de 15 segundos
});
