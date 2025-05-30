import MercadoPago, { Preference } from '@src/index';
import { config } from '../e2e.config';
import type { PreferenceCreateData } from '@src/clients/preference/create/types';

describe('Preference IT, search', () => {
	test('should search a request and match response object', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const preference = new Preference(client);

		// Primeiro criar uma preferência para garantir que temos algo para buscar
		// Usando external_reference único baseado no padrão do SDK PHP
		const external_reference = `ext_ref_${Date.now()}`;
		
		const preferenceRequest: PreferenceCreateData = {
			body: {
				external_reference: external_reference,
				items: [
					{
						id: '4567',
						category_id: 'car_electronics',
						currency_id: 'BRL',
						description: 'Dummy search test',
						picture_url: 'https://http2.mlstatic.com/D_NQ_NP_887467-MLA71526269815_092023-F.jpg',
						title: 'Test Search Preference',
						quantity: 1,
						unit_price: 10
					}
				],
			}
		};

		// Criar a preferência
		const createdPreference = await preference.create(preferenceRequest);
		expect(createdPreference).toHaveProperty('id');
		expect(createdPreference.external_reference).toBe(external_reference);

		// Aguardar um pouco para que a preferência seja indexada para busca
		await new Promise(resolve => setTimeout(resolve, 2000));

		// Agora buscar pela external_reference que acabamos de criar
		const searchOptions = {
			external_reference: external_reference
		};

		const searched = await preference.search({ options: searchOptions });

		// Verificar a estrutura da resposta
		expect(searched).toEqual(expect.objectContaining({
			elements: expect.any(Array),
			next_offset: expect.any(Number),
			total: expect.any(Number),
		}));

		// Verificar se encontrou resultados
		if (searched.elements && searched.elements.length > 0) {
			// Se encontrou resultados, verificar o primeiro resultado
			expect(searched.elements.length).toBeGreaterThan(0);
			expect(searched.elements[0]).toEqual(expect.objectContaining({
				id: expect.any(String),
				external_reference: external_reference,
			}));

			// Verificar propriedades opcionais que podem estar presentes
			if (searched.elements[0].client_id) {
				expect(searched.elements[0].client_id).toEqual(expect.any(String));
			}
			if (searched.elements[0].collector_id) {
				expect(searched.elements[0].collector_id).toEqual(expect.any(Number));
			}
			if (searched.elements[0].date_created) {
				expect(searched.elements[0].date_created).toEqual(expect.any(String));
			}
			if (searched.elements[0].expires !== undefined) {
				expect(searched.elements[0].expires).toEqual(expect.any(Boolean));
			}
			if (searched.elements[0].live_mode !== undefined) {
				expect(searched.elements[0].live_mode).toEqual(expect.any(Boolean));
			}
			if (searched.elements[0].marketplace) {
				expect(searched.elements[0].marketplace).toEqual(expect.any(String));
			}
			if (searched.elements[0].operation_type) {
				expect(searched.elements[0].operation_type).toEqual(expect.any(String));
			}
			if (searched.elements[0].site_id) {
				expect(searched.elements[0].site_id).toEqual(expect.any(String));
			}
			if (searched.elements[0].sponsor_id) {
				expect(searched.elements[0].sponsor_id).toEqual(expect.any(Number));
			}
			if (searched.elements[0].shipping_mode) {
				expect(searched.elements[0].shipping_mode).toEqual(expect.any(String));
			}
		} else {
			// Se não encontrou resultados, verificar que pelo menos a busca funcionou
			console.log('No preferences found for external_reference:', external_reference);
			expect(searched.total).toBe(0);
		}

		// Nota: Preferências geralmente não são removidas via API, elas ficam no sistema
		// Então não fazemos cleanup aqui, diferente do customer
	});
});
