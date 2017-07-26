import * as ENV from './env';
import shared from './shared';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import SplitByPathPlugin from 'webpack-split-by-path';

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(ENV.SRC_PATH, 'index.html'),
		inject: 'body'
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
	})
];

export default (host, port, includeRegeneratorRuntime = false) => {
	const config = shared();

	const index = [
		ENV.CORE_JS,
		ENV.FETCH,
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://${host}:${port}`,
		'webpack/hot/only-dev-server',
		path.resolve(ENV.SRC_PATH, 'index.tsx')
	];
	if (includeRegeneratorRuntime) {
		index.unshift(ENV.REGENERATOR_RUNTIME);
	}

	return {
		...config,
		entry: {
			...config.entry,
			index
		},
		plugins: [
			...config.plugins,
			...plugins
		]
	};
};