import jestConfig from '../jest.config';

jestConfig.rootDir = '../';
jestConfig.testPathIgnorePatterns = [
	'src'
];

export default jestConfig;
