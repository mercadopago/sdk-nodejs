import { MercadoPagoConfig } from "../../../MercadoPagoConfig";
import search from '.'
import { RestClient } from "../../../utils/restClient";

jest.mock("../../../utils/restClient");

describe('Testing search payments, search', () => {
	test('shoud pass foward request options from search to RestClient.fetch', async () => {
        const client = new MercadoPagoConfig({accessToken: 'accessToken', options: {timeout: 5000}})
		await search({config : client})
        const spyFetch = jest.spyOn(RestClient, 'fetch') 
        expect(spyFetch).toHaveBeenCalledWith("/payments/search", {"headers": {"Authorization": "accessToken"}, "queryParams": {}, "timeout": 5000})
	});
});
