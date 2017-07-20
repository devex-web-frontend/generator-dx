import path from 'path';
import glob from 'glob';
import * as ENV from './env';
import autoprefixer from 'autoprefixer';
import SVGSpriteExtractPlugin from 'svg-sprite-extract-plugin';

const JS_PATTERN = /\.jsx?$/;
const FILE_PATTERN = /\.png$|\.jpg$|\.gif$|\.swf$|\.ico$|\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/;
const STYLUS_OPTIONS = {
	nocheck: true,
	'include css': true,
	'resolve url': true,
	paths: [
		ENV.LIB_PATH
	]
};

const svgExtractor = new SVGSpriteExtractPlugin(ENV.SVG_SPRITE_ENTRY,
	{
		idTemplate: '[path][name]',
		context: ENV.SRC_PATH
	}
);

const plugins = [
	svgExtractor
];

const noParse = [
	ENV.CORE_JS,
	...glob.sync(path.join(ENV.LIB_PATH, '/*'), {
		ignore: ENV.ES6
	}).map(file => path.resolve(file))
];

const alias = {
	config: path.resolve(ENV.SRC_PATH, 'config/config.styl'),
	theme: path.resolve(ENV.ROOT, 'config/theme/theme.js')
};

const loaders = [
	//es6 libs
	{
		test: JS_PATTERN,
		loader: 'babel-loader',
		include: ENV.ES6
	},
	//js
	{
		test: JS_PATTERN,
		loader: 'babel-loader',
		exclude: [
			ENV.NODE_MODULES_PATH,
			...noParse
		]
	},
	//files
	{
		test: FILE_PATTERN,
		loader: 'file-loader?name=[path][name].[ext]?[hash]&context=src'
	},
	//svg
	{
		test: /\.svg$/,
		loader: svgExtractor.extract('svgo')
	},
	//typescript
	{
		test: /\.tsx?$/,
		loader: 'ts-loader'
	},
	//css
	{
		test: /\.css$/,
		loader: [
			'style-loader',
			'css-loader?localIdentName=[name]__[local]__[hash:base64:5]',
			'postcss-loader'
		].join('!'),
		exclude: [
			ENV.SRC_PATH,
			...ENV.CSS_MODULES
		]
	},
	//css-modules
	{
		test: /\.css$/,
		loader: [
			'style-loader',
			'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
			'postcss-loader'
		].join('!'),
		include: [
			ENV.SRC_PATH,
			...ENV.CSS_MODULES
		]
	},
	//stylus
	{
		test: /\.styl$/,
		loader: [
			'style-loader',
			'css-loader?localIdentName=[name]__[local]__[hash:base64:5]',
			'postcss-loader',
			`stylus-loader?${JSON.stringify(STYLUS_OPTIONS)}`
		].join('!'),
		exclude: [
			ENV.SRC_PATH,
			...ENV.CSS_MODULES
		]
	},
	//stylus-modules
	{
		test: /\.styl$/,
		loader: [
			'style-loader',
			'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
			'postcss-loader',
			`stylus-loader?${JSON.stringify(STYLUS_OPTIONS)}`
		].join('!'),
		include: [
			ENV.SRC_PATH,
			...ENV.CSS_MODULES
		]
	}
];

export default () => ({
	output: {
		path: ENV.DIST_PATH,
		filename: '[name].js'
	},
	module: {
		loaders,
		noParse
	},
	resolve: {
		modulesDirectories: [
			ENV.NODE_MODULES_PATH,
			ENV.LIB_PATH
		],
		alias,
		extensions: [
			'',
			'.ts',
			'.tsx',
			'.js',
			'.jsx'
		]
	},
	plugins,
	postcss() {
		return [
			autoprefixer
		];
	}
});