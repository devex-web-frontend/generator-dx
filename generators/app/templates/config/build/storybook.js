import * as ENV from './env';
import shared from './shared';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(ENV.SRC_PATH, 'storybook/index.html'),
		chunks: [
			'manager'
		],
		inject: 'body'
	}),
	new HtmlWebpackPlugin({
		filename: 'iframe.html',
		template: path.resolve(ENV.SRC_PATH, 'storybook/iframe.html'),
		chunks: [
			'preview'
		],
		inject: 'body'
	})
];

export default (host, port) => {
	const config = shared();
	return {
		...config,
		entry: {
			manager: [
				ENV.CORE_JS,
				ENV.FETCH,
				require.resolve('@kadira/storybook/dist/server/addons.js'),
				require.resolve('@kadira/storybook/dist/client/manager/index.js')
			],
			preview: [
				ENV.CORE_JS,
				ENV.FETCH,
				'react-hot-loader/patch',
				`webpack-dev-server/client?http://${host}:${port}`,
				'webpack/hot/only-dev-server',
				require.resolve('@kadira/storybook/dist/server/addons.js'),
				require.resolve('../storybook/client.js'),
			]
		},
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				'~DemoComponent': path.resolve(ENV.SRC_PATH, 'dev/Demo.tsx')
			}
		},
		plugins: [
			...config.plugins,
			...plugins
		]
	};
};