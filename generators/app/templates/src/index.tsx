import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App/App';

const root = document.getElementById('root');

const render = (Component: typeof App) => {
	let container = <Component/>;

	if (process.env.NODE_ENV === 'production') {
		const AppContainer = require('react-hot-loader').AppContainer; //tslint:disable-line no-require-imports
		const {RedBox} = require('./dev/HotErrorReporter.tsx'); //tslint:disable-line no-require-imports
		container = (
			<AppContainer errorReporter={RedBox}>
				{container}
			</AppContainer>
		);
	}

	ReactDOM.render(
		container,
		root
	);
};

render(App);

if (module['hot']) {
	module['hot'].accept(() => {
		render(require('./components/App/App').App); //tslint:disable-line no-require-imports
	});
}