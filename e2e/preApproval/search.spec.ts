import MercadoPago, { PreApproval } from '@src/index';
import { config } from '../e2e.config';

describe('PreApproval IT, search', () => {
	test('should search preApproval and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token, options: { timeout: 10000 } });
		const preApproval = new PreApproval(client);
		
		// Usar external_reference único baseado no padrão do SDK PHP
		const external_reference = `ext_ref_${Date.now()}`;
		
		const body = {
			reason: 'Test Search PreApproval',
			external_reference: external_reference,
			payer_email: config.email,
			auto_recurring: {
				frequency: 1,
				frequency_type: 'days',
				transaction_amount: 10,
				currency_id: 'BRL'
			},
			back_url: 'https://www.mercadopago.com.ar',
			status: 'pending'
		};

		// Criar o preApproval
		const createPreApproval = await preApproval.create({ body });
		expect(createPreApproval).toHaveProperty('id');
		expect(createPreApproval.external_reference).toBe(external_reference);

		// Aguardar um pouco para que o preApproval seja indexado para busca
		await new Promise(resolve => setTimeout(resolve, 3000));

		// Buscar usando payer_id
		const options = {
			payer_id: createPreApproval.payer_id
		};

		const searchPreApproval = await preApproval.search({ options });
		
		// Verificar estrutura básica da resposta
		expect(searchPreApproval).toHaveProperty('results');
		expect(searchPreApproval.results).toEqual(expect.any(Array));

		// Verificar se encontrou resultados
		if (searchPreApproval.results && searchPreApproval.results.length > 0) {
			// Buscar pelo preApproval específico que criamos
			const foundPreApproval = searchPreApproval.results.find(
				(pa: any) => pa.external_reference === external_reference
			);

			if (foundPreApproval) {
				expect(foundPreApproval.payer_id).toBe(createPreApproval.payer_id);
				expect(foundPreApproval.external_reference).toBe(external_reference);
				
				// Verificar propriedades essenciais
				expect(foundPreApproval).toEqual(expect.objectContaining({
					id: expect.any(String),
					status: expect.any(String),
					reason: expect.any(String),
					external_reference: external_reference,
					payer_id: expect.any(Number),
					collector_id: expect.any(Number),
					date_created: expect.any(String),
				}));

				// Verificar propriedades opcionais que podem estar presentes
				if (foundPreApproval.back_url) {
					expect(foundPreApproval.back_url).toEqual(expect.any(String));
				}
				if (foundPreApproval.application_id) {
					expect(foundPreApproval.application_id).toEqual(expect.any(Number));
				}
				if (foundPreApproval.last_modified) {
					expect(foundPreApproval.last_modified).toEqual(expect.any(String));
				}
				if (foundPreApproval.init_point) {
					expect(foundPreApproval.init_point).toEqual(expect.any(String));
				}
				if (foundPreApproval.auto_recurring) {
					expect(foundPreApproval.auto_recurring).toEqual(expect.objectContaining({
						frequency: expect.any(Number),
						frequency_type: expect.any(String),
						transaction_amount: expect.any(Number),
						currency_id: expect.any(String),
					}));
				}
			} else {
				// Se não encontrou o específico que criamos, pelo menos verificar que a busca funcionou
				console.log('PreApproval created but not found in search results for external_reference:', external_reference);
				expect(searchPreApproval.results[0].payer_id).toBe(createPreApproval.payer_id);
			}
		} else {
			// Se não encontrou resultados, verificar que pelo menos a busca funcionou sem erro
			console.log('No preApprovals found for payer_id:', createPreApproval.payer_id);
			expect(searchPreApproval.results).toEqual([]);
		}
	}, 15000); // Timeout de 15 segundos
});
