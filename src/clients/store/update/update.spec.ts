import update from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing store, update', () => {
	test('should pass forward request options from update to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			name: 'Store name',
			business_hours: {
				monday: {
					open: '08:00',
					close: '18:00'
				}
			},
			location: {
				address_line: 'Av. Caseros 3039',
				reference: '3rd floor',
				city: {
					id: 'TUxBQ0NBUGZlZG1sYQ'
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ id: '123' });

		await update({ storeId: '123', userId: '456', body, config: client });

		expect(spyFetch).toHaveBeenCalledWith('/users/456/stores/123', {
			'body': JSON.stringify(body),
			'headers': { 'Authorization': 'Bearer token' },
			'method': 'PUT',
			'timeout': 5000
		});
	});
});
