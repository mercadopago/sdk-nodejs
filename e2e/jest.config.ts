import jestConfig from '../jest.config';

jestConfig.rootDir = '../';
jestConfig.testPathIgnorePatterns = [
	'src'
];
jestConfig.rootDir = '.';

export default jestConfig;
