import minimist from 'minimist';
import dev from '../config/build/dev';
import webpack from 'webpack';
import WDS from 'webpack-dev-server';
import * as ENV from '../config/build/env';

const argv = minimist(process.argv.slice(2));
const port = argv['port'] || 8080;
const host = argv['host'] || 'localhost';

console.log('Starting <%= name %> dev...');

const config = dev(host, port);
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