import * as ENV from './env';
import shared from './shared';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import SplitByPathPlugin from 'webpack-split-by-path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const css = new ExtractTextPlugin('css', '[name].css');

const plugins = [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(ENV.SRC_PATH, 'index.html'),
		inject: 'body'
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		mangle: false
	}),
	new SplitByPathPlugin([
		{
			name: 'vendor',
			path: [
				ENV.NODE_MODULES_PATH
			]
		}
	], {
		manifest: 'manifest'
	}),
	css
];

const patchCSSLoader = loaderOptions => {
	return {
		...loaderOptions,
		loader: css.extract(
			'style',
			loaderOptions.loader.replace(/^style!/, '')
		)
	};
};

export default (includeRegeneratorRuntime = false) => {
	const config = shared();

	const index = [
		ENV.CORE_JS,
		ENV.FETCH,
		path.resolve(ENV.SRC_PATH, 'index.tsx')
	];
	if (includeRegeneratorRuntime) {
		index.unshift(ENV.REGENERATOR_RUNTIME);
	}

	const loaders = config.module.loaders.map(loader => {
		if (['css', 'css-modules', 'stylus', 'stylus-modules'].includes(loader.name)) {
			return patchCSSLoader(loader);
		}
		return loader;
	});

	return {
		...config,
		entry: {
			...config.entry,
			index
		},
		module: {
			...config.module,
			loaders
		},
		resolve: {
			...config.resolve
		},
		plugins: [
			...config.plugins,
			...plugins
		]
	};
};