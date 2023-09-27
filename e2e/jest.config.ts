import jestConfig from '../jest.config';

jestConfig.testPathIgnorePatterns = [
	'/node_modules/',
	'/src/'
];
jestConfig.rootDir = '.';

export default jestConfig;
