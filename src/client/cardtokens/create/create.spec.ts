import { RestClient } from '../../../utils/restClient'
import create from '.';
import { MercadoPagoConfig } from '../../../MercadoPagoConfig';

jest.mock("../../../utils/restClient");

describe('Testing card tokens, create', () => {
	test('shoud pass foward request options from create to RestClient.fetch', async () => {
        const client = new MercadoPagoConfig({accessToken: 'accessToken', options: {timeout: 5000}})

        const body = {
           card_id : "11111111",
           security_code : "123"
        }

        await create({body: body, config: client})

        const spyFetch = jest.spyOn(RestClient, 'fetch') 
        expect(spyFetch).toHaveBeenCalledWith("card_tokens", {"headers": {"Authorization": "accessToken"},
          "timeout": 5000, "body": "{\"card_id\":\"11111111\",\"security_code\":\"123\"}",
          "method": "POST"})
	});
});
