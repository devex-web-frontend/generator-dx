//commonjs here
const path = require('path');
const ENV = require('../config/build/env');
require('babel-register')({
	ignore(file) {
		const filePath = path.resolve(file);

		return filePath.startsWith(ENV.NODE_MODULES_PATH) && !ENV.ES6.some(dep => filePath.startsWith(dep));
	}
});
require(path.resolve(process.argv[2]));