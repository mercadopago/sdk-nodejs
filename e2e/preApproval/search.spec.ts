import MercadoPago, { PreApproval } from '@src/index';
import { config } from '../e2e.config';

describe('Testing preApproval , create', () => {
	test('should make a POST request with the correct parameters', async () => {
		const client = new MercadoPago({ accessToken: config.test_access_token, options: { timeout: 5000 } });
		const preApproval = new PreApproval(client);
		const body = {
			reason: 'test',
			external_reference: 'S01',
			payer_email: 'test_user_1314812285@testuser.com',
			auto_recurring: {
				frequency: 1,
				frequency_type: 'days',
				transaction_amount: 10,
				currency_id: 'BRL'
			},
			back_url: 'https://www.mercadopago.com.ar',
			status: 'pending'
		};

		const createPreApproval = await preApproval.create({ body });
		expect(createPreApproval).toHaveProperty('id');

		const options = {
			payer_id: createPreApproval.payer_id
		};

		const searchPreApproval = await preApproval.search({ options });
		expect(searchPreApproval.results[0].payer_id).toBe(createPreApproval.payer_id);
		expect(searchPreApproval.results[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			status: expect.any(String),
			reason: expect.any(String),
			external_reference: expect.any(String),
			back_url: expect.any(String),
			date_created: expect.any(String),
			payer_id: expect.any(Number),
			collector_id: expect.any(Number),
			application_id: expect.any(Number),
			last_modified: expect.any(String),
			init_point: expect.any(String),
			auto_recurring: expect.objectContaining({
				frequency: expect.any(Number),
				frequency_type: expect.any(String),
				transaction_amount: expect.any(Number),
				currency_id: expect.any(String),
			}),
		}));
	});
});
