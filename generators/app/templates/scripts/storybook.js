import minimist from 'minimist';
import storybook from '../config/build/storybook';
import webpack from 'webpack';
import WDS from 'webpack-dev-server';
import * as ENV from '../config/build/env';

const argv = minimist(process.argv.slice(2));
const port = argv['port'] || 9001;
const host = argv['host'] || 'localhost';

console.log('Starting <%= name %> storybook...');

const config = storybook(host, port);
const compiler = webpack(config);
const server = new WDS(compiler, {
	hot: true,
	historyApiFallback: true,
	stats: ENV.STATS
});

server.listen(port, host, (error, result) => {
	if (error) {
		return console.error(error);
	}

	console.log(`Listening at http://${host}:${port}/`);
	console.log('Compiling...');
});