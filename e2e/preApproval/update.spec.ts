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

		const updateBody = {
			reason: 'update test',
			external_reference: 'S02',
			auto_recurring: {
				transaction_amount: 20,
				currency_id: 'BRL'
			},
			back_url: 'https://www.mercadopago.com.br',
			status: 'pending'
		};
		const updatePreApproval = await preApproval.update({ id: createPreApproval.id, body: updateBody });

		expect(updatePreApproval.reason).toBe(updateBody.reason);
		expect(updatePreApproval.external_reference).toBe(updateBody.external_reference);
		expect(updatePreApproval.auto_recurring.transaction_amount).toBe(updateBody.auto_recurring.transaction_amount);
		expect(updatePreApproval.auto_recurring.currency_id).toBe(updateBody.auto_recurring.currency_id);
		expect(updatePreApproval.back_url).toBe(updateBody.back_url);
		expect(updatePreApproval.status).toBe(updateBody.status);
		expect(updatePreApproval).toEqual(expect.objectContaining({
			id: expect.any(String),
			status: expect.any(String),
			reason: expect.any(String),
			external_reference: expect.any(String),
			payer_email: expect.any(String),
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
