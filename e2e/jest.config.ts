import jestConfig from '../jest.config';

jestConfig.testPathIgnorePatterns = [
	'/node_modules/',
	'/src/'
];

export default jestConfig;
