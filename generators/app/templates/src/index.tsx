import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/app.component';

const root = document.getElementById('root');

const render = (Component: typeof App) => {
	ReactDOM.render(
		<App/>,
		root
	);
};

render(App);

if (module['hot']) {
	module['hot'].accept(() => {
		render(require('./components/app/app.component').App); //tslint:disable-line no-require-imports
	});
}