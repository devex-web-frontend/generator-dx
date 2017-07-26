import prod from '../config/build/prod';
import webpack from 'webpack';
import * as ENV from '../config/build/env';

console.log('Starting prod...');

run(prod())
	.then(stats => {
		console.log('Done');
		console.log(stats.toString(ENV.STATS));
	})
	.catch(e => {
		const errors = Array.isArray(e) ? e : [e];
		errors.forEach(error => {
			console.error();
			console.error(error.stack || error);
			console.error();
		});
		process.exit(1);
	});

/**
 * Runs webpack compiler as a promise
 * @param {Object} config
 * @returns {Promise}
 */
function run(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (error, stats) => {
			if (error) {
				return reject(error);
			} else {
				const jsonStats = stats.toJson();
				if (jsonStats.errors.length > 0) {
					return reject(jsonStats.errors);
				} else {
					resolve(stats);
				}
			}
		});
	});
}