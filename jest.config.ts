import type {Config} from 'jest';

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: [
		'json',
	],
	testMatch: [
		'**/?(*.)+(spec|test).[tj]s?(x)'
	],
	transform: {'^.+\\.(ts|tsx)$': 'ts-jest'},
};

export default config;
