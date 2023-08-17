import { RestClient } from '../../../utils/restClient'
import get from '.';
import { MercadoPagoConfig } from '../../../MercadoPagoConfig';

jest.mock("../../../utils/restClient");

describe('Testing card tokens, get', () => {
	test('shoud pass foward request options from get to RestClient.fetch', async () => {
        const client = new MercadoPagoConfig({accessToken: 'token', options: {timeout: 5000}})
        await get({id: "123", config: client})
        const spyFetch = jest.spyOn(RestClient, 'fetch') 
        expect(spyFetch).toHaveBeenCalledWith("/card_tokens/123", {"headers": {"Authorization": "Bearer token"}, "timeout": 5000})
	});
});
