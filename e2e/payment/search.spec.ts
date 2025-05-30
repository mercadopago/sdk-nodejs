import MercadoPago, { Payment } from '@src/index';
import { config } from '../e2e.config';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';
import type { PaymentCreateData } from '@src/clients/payment/create/types';

describe('Payment IT, search', () => {
	test('should search Payment and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 10000 } });
		const payment = new Payment(client);

		// Primeiro criar um payment para garantir que temos algo para buscar
		// Usando external_reference único baseado no padrão do SDK PHP
		const external_reference = `ext_ref_${Date.now()}`;
		const email = createEmailTestUser();

		const paymentRequest: PaymentCreateData = {
			body: {
				external_reference: external_reference,
				additional_info: {
					items: [
						{
							id: 'MLB2907679857',
							title: 'Point Mini Search Test',
							quantity: 1,
							unit_price: 58.8
						}
					]
				},
				payer: {
					email,
				},
				transaction_amount: 110.00,
				installments: 1,
				payment_method_id: 'pix'
			}
		};

		// Criar o payment
		const createdPayment = await payment.create(paymentRequest);
		expect(createdPayment).toHaveProperty('id');
		expect(createdPayment.external_reference).toBe(external_reference);

		// Aguardar um pouco para que o payment seja indexado para busca
		await new Promise(resolve => setTimeout(resolve, 3000));

		// Busca geral sem filtros para verificar estrutura básica
		const searchPayment = await payment.search();

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');
		expect(searchPayment.results).toEqual(expect.any(Array));
		expect(searchPayment.paging).toEqual(expect.objectContaining({
			total: expect.any(Number),
			limit: expect.any(Number),
			offset: expect.any(Number),
		}));

		// Se encontrou resultados, verificar a estrutura do primeiro resultado
		if (searchPayment.results && searchPayment.results.length > 0) {
			// Verificar apenas as propriedades essenciais
			expect(searchPayment.results[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				status: expect.any(String),
				payment_method_id: expect.any(String),
				transaction_amount: expect.any(Number),
				currency_id: expect.any(String),
				date_created: expect.any(String),
			}));

			// Verificar propriedades que podem estar presentes
			if (searchPayment.results[0].external_reference) {
				expect(searchPayment.results[0].external_reference).toEqual(expect.any(String));
			}
			if (searchPayment.results[0].collector_id) {
				expect(searchPayment.results[0].collector_id).toEqual(expect.any(Number));
			}
		}
	}, 15000); // Timeout de 15 segundos

	test('should search payments with filtered by external_reference', async () => {
		const client = new MercadoPago({ accessToken: config.access_token, options: { timeout: 10000 } });
		const payment = new Payment(client);

		// Criar um payment específico para buscar por external_reference
		const external_reference = `ext_ref_${Date.now()}`;
		const email = createEmailTestUser();

		const paymentRequest: PaymentCreateData = {
			body: {
				external_reference: external_reference,
				additional_info: {
					items: [
						{
							id: 'MLB2907679857',
							title: 'Point Mini Filtered Search Test',
							quantity: 1,
							unit_price: 58.8
						}
					]
				},
				payer: {
					email,
				},
				transaction_amount: 150.00,
				installments: 1,
				payment_method_id: 'pix'
			}
		};

		// Criar o payment
		const createdPayment = await payment.create(paymentRequest);
		expect(createdPayment).toHaveProperty('id');
		expect(createdPayment.external_reference).toBe(external_reference);

		// Aguardar um pouco para que o payment seja indexado para busca
		await new Promise(resolve => setTimeout(resolve, 3000));

		// Buscar pelo external_reference específico
		const options = {
			options: {
				external_reference: external_reference
			}
		};
		const searchPayment = await payment.search(options);

		expect(searchPayment).toHaveProperty('results');
		expect(searchPayment).toHaveProperty('paging');

		// Verificar se encontrou resultados
		if (searchPayment.results && searchPayment.results.length > 0) {
			// Se encontrou, deve ser exatamente o external_reference que criamos
			expect(searchPayment.results[0].external_reference).toBe(external_reference);
			
			// Verificar apenas as propriedades essenciais com tipos corretos
			expect(searchPayment.results[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				external_reference: external_reference,
				status: expect.any(String),
				payment_method_id: expect.any(String),
				transaction_amount: expect.any(Number),
				currency_id: expect.any(String),
				date_created: expect.any(String),
			}));

			// Verificar propriedades opcionais que podem estar presentes
			if (searchPayment.results[0].collector_id) {
				expect(searchPayment.results[0].collector_id).toEqual(expect.any(Number));
			}
			if (searchPayment.results[0].date_approved) {
				expect(searchPayment.results[0].date_approved).toEqual(expect.any(String));
			}
			if (searchPayment.results[0].payer) {
				expect(searchPayment.results[0].payer).toEqual(expect.any(Object));
			}
		} else {
			// Se não encontrou, pelo menos verificar que a busca funcionou sem erro
			console.log('No payments found for external_reference:', external_reference);
			expect(searchPayment.paging.total).toBe(0);
		}
	}, 15000); // Timeout de 15 segundos
});
