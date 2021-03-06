//commonjs here

const path = require('path');

const ROOT = module.exports.ROOT = path.join(__dirname, '../../');
const DIST_PATH = module.exports.DIST_PATH = path.resolve(ROOT, 'dist');
const SRC_PATH = module.exports.SRC_PATH = path.resolve(ROOT, 'src');
const NODE_MODULES_PATH = module.exports.NODE_MODULES_PATH = path.resolve(ROOT, 'node_modules');
const SVG_SPRITE_ENTRY = module.exports.SVG_SPRITE_ENTRY = 'svg-sprite.js';
const CORE_JS = module.exports.CORE_JS = 'core-js/client/shim.min.js';
const REGENERATOR_RUNTIME = module.exports.REGENERATOR_RUNTIME = 'regenerator-runtime/runtime';
const FETCH = module.exports.FETCH = 'isomorphic-fetch';

const ES6 = module.exports.ES6 = [
	path.resolve(NODE_MODULES_PATH, 'svg-sprite-extract-plugin'),
	path.resolve(NODE_MODULES_PATH, 'dx-components')
];

const CSS_MODULES = module.exports.CSS_MODULES = [
	path.resolve(NODE_MODULES_PATH, 'dx-components/src')
];

const STATS = module.exports.STATS = {
	assets: true,
	colors: true,
	version: false,
	hash: false,
	timings: false,
	chunks: false,
	chunkModules: false,
	children: false
};