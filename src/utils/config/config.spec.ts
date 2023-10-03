import { AppConfig } from '.';

jest.mock('../../../package.json', () => ({
	version: '1.0.0-test',
}));

describe('AppConfig', () => {
	let originalNodeVersion: string;
	let originalNodeArchitecture: string;
	let originalNodePlatform: string;

	beforeEach(() => {
		originalNodeVersion = AppConfig.getNodeVersion();
		originalNodeArchitecture = AppConfig.getNodeArchitecture();
		originalNodePlatform = AppConfig.getNodePlatform();

		AppConfig['SDK_VERSION'] = '1.0.0-test';
		AppConfig['getNodeVersion'] = jest.fn(() => 'v13.14.0');
		AppConfig['getNodeArchitecture'] = jest.fn(() => 'x64');
		AppConfig['getNodePlatform'] = jest.fn(() => 'linux');
	});

	afterEach(() => {
		AppConfig['getNodeVersion'] = jest.fn(() => originalNodeVersion);
		AppConfig['getNodeArchitecture'] = jest.fn(() => originalNodeArchitecture);
		AppConfig['getNodePlatform'] = jest.fn(() => originalNodePlatform);
	});

	it('should have correct constants', () => {
		expect(AppConfig.DEFAULT_TIMEOUT).toEqual(10000);
		expect(AppConfig.DEFAULT_RETRIES).toEqual(2);
		expect(AppConfig.BASE_DELAY_MS).toEqual(1000);
		expect(AppConfig.BASE_URL).toEqual('https://api.mercadopago.com');
		expect(AppConfig.getNodeVersion()).toEqual('v13.14.0');
		expect(AppConfig.getNodeArchitecture()).toEqual('x64');
		expect(AppConfig.getNodePlatform()).toEqual('linux');
	});

	it('should return correct tracking ID', () => {
		const expectedTrackingId = 'platform:v13|v13.14.0,type:SDK1.0.0-test,so;';
		expect(AppConfig.getTrackingId()).toEqual(expectedTrackingId);
	});

	it('should return correct user agent', () => {
		const expectedUserAgent = 'MercadoPago Node.js SDK v1.0.0-test (node v13.14.0-x64-linux)';
		expect(AppConfig.getUserAgent()).toEqual(expectedUserAgent);
	});
});
