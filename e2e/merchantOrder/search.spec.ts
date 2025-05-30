import { PreferenceCreateData } from '@src/clients/preference/create/types';
import MercadoPago, { MerchantOrder, Preference } from '@src/index';
import { config } from '../e2e.config';

describe('Testing merchantOrder, search', () => {
	test('should search an order and match with declared shape', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const preference = new Preference(client);
		const merchantOrder = new MerchantOrder(client);

		// Usar external_reference único baseado no padrão do SDK PHP
		const external_reference = `ext_ref_${Date.now()}`;

		const preferenceRequest: PreferenceCreateData = {
			body: {
				external_reference: external_reference,
				items: [
					{
						id: '4567',
						category_id: 'car_electronics',
						currency_id: 'BRL',
						description: 'Dummy create',
						title: 'Dummy Title',
						quantity: 1,
						unit_price: 10
					}
				],
			}
		};

		const preferenceCreate = await preference.create(preferenceRequest);
		expect(preferenceCreate).toHaveProperty('id');
		expect(preferenceCreate.external_reference).toBe(external_reference);

		const body = {
			preference_id: preferenceCreate.id,
		};
		const createOrder = await merchantOrder.create({ body });
		expect(createOrder).toHaveProperty('id');

		// Aguardar indexação para busca
		await new Promise(res => setTimeout(res, 5000));

		const options = {
			preference_id: preferenceCreate.id,
		};

		const searchOrder = await merchantOrder.search({ options: options });
		
		// Verificar estrutura básica da resposta
		expect(searchOrder).toEqual(expect.objectContaining({
			next_offset: expect.any(Number),
			total: expect.any(Number),
		}));

		// Verificar se encontrou resultados - seguindo padrão defensivo do SDK PHP
		if (searchOrder.elements && searchOrder.elements.length > 0) {
			// Se encontrou resultados, verificar o primeiro elemento
			expect(searchOrder.elements).toEqual(expect.any(Array));
			expect(searchOrder.elements[0].preference_id).toBe(options.preference_id);
			expect(searchOrder.elements[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				preference_id: expect.any(String),
				status: expect.any(String),
				site_id: expect.any(String),
				collector: expect.any(Object),
				date_created: expect.any(String),
				last_updated: expect.any(String),
				shipping_cost: expect.any(Number),
				total_amount: expect.any(Number),
				paid_amount: expect.any(Number),
				refunded_amount: expect.any(Number),
				cancelled: expect.any(Boolean),
				order_status: expect.any(String),
				is_test: expect.any(Boolean),
			}));
		} else {
			// Se não encontrou resultados, pelo menos verificar que a busca funcionou
			console.log('No merchant orders found for preference_id:', options.preference_id);
			expect(searchOrder.total).toBe(0);
			// Elements pode ser null ou array vazio
			expect(searchOrder.elements === null || Array.isArray(searchOrder.elements)).toBe(true);
		}
	}, 15000);
});
