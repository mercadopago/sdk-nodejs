import update from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing merchantOrder, update', () => {
	test('shoud pass foward request options from update to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			external_reference: 'default',
			preference_id: 'Preference identification',
			payer: {
				id: 123,
				nickname: 'JOHN'
			},
			site_id: 'MLA',
			items: [
				{
					id: 'item id',
					category_id: 'item category',
					currency_id: 'BRL',
					description: 'item description',
					picture_url: 'item picture',
					quantity: 1,
					unit_price: 5,
					title: 'item title'
				}
			],
			application_id: '10000000000000000'
		};

		await update({ merchantOrderId: '123', body, config: client });

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith( '/merchant_orders/123', { 
			'body': JSON.stringify(body),
			'headers': { 'Authorization': 'Bearer token' }, 'method': 'PUT', 'timeout': 5000 });
	});
});
