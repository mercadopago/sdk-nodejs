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
		expect(createPreApproval.reason).toBe(body.reason);
		expect(createPreApproval.external_reference).toBe(body.external_reference);
		expect(createPreApproval.auto_recurring.frequency).toBe(body.auto_recurring.frequency);
		expect(createPreApproval.auto_recurring.frequency_type).toBe(body.auto_recurring.frequency_type);
		expect(createPreApproval.auto_recurring.transaction_amount).toBe(body.auto_recurring.transaction_amount);
		expect(createPreApproval.auto_recurring.currency_id).toBe(body.auto_recurring.currency_id);
		expect(createPreApproval.back_url).toBe(body.back_url);
		expect(createPreApproval.status).toBe(body.status);
		expect(createPreApproval).toEqual(expect.objectContaining({
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
