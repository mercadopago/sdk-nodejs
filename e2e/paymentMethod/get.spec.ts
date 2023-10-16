import MercadoPago, { PaymentMethod } from '@src/index';
import { config } from '../e2e.config';

describe('Testing get payment methods, get', () => {
	test('should return all available payment methods ', async () => {
		const client = new MercadoPago({ accessToken: config.access_token });
		const paymentMethod = new PaymentMethod(client);

		const paymentMethodGet = await paymentMethod.get();

		paymentMethodGet.forEach(paymentMethod => {
			expect([
				'visa', 'elo', 'master', 'hipercard', 'pix', 'amex', 'pec', 'bolbradesco', 'account_money', 'debelo'
			]).toContain(paymentMethod.id);
		});
		paymentMethodGet.forEach(paymentMethod => {
			expect([
				'account_money', 'ticket', 'bank_transfer', 'atm', 'credit_card', 'debit_card', 'prepaid_card', 'digital_currency', 'digital_wallet', 'voucher_card', 'crypto_transfer'
			]).toContain(paymentMethod.payment_type_id);
		});
		paymentMethodGet.forEach(paymentMethod => {
			expect([
				'active', 'deactive', 'temporally_deactive'
			]).toContain(paymentMethod.status);
		});
		paymentMethodGet.forEach(paymentMethod => {
			expect([
				'supported', 'unsupported', 'does_not_apply'
			]).toContain(paymentMethod.deferred_capture);
		});
		expect(Array.isArray(paymentMethodGet)).toBe(true);
		expect(paymentMethodGet[0]).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: expect.any(String),
			payment_type_id: expect.any(String),
			status: expect.any(String),
			secure_thumbnail: expect.any(String),
			thumbnail: expect.any(String),
			deferred_capture: expect.any(String),
			settings: expect.any(Array),
			additional_info_needed: expect.any(Array),
			min_allowed_amount: expect.any(Number),
			max_allowed_amount: expect.any(Number),
			accreditation_time: expect.any(Number),
			financial_institutions: expect.any(Array),
			processing_modes: expect.any(Array),
		}));
	});
});
