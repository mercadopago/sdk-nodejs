import create from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing merchantOrder, create', () => {
	test('should pass forward request options from create to RestClient.fetch', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });

		const body = {
			external_reference: '<EXTERNAL_REFERENCE>',
			preference_id: 'Preference identification',
			payer: {
				id: 123,
				nickname: 'JOHN'
			},
			site_id: 'MLA',
			items: [
				{
					id: '<ITEM_ID>',
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

		await create({ body, config: client });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		expect(spyFetch).toHaveBeenCalledWith('/merchant_orders', {
			'body': JSON.stringify(body),
			'headers': { 'Authorization': 'Bearer token' },
			'method': 'POST', 'timeout': 5000 });
	});
});
