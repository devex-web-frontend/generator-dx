import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../app.component';

describe('app.component', () => {
	it('renders without crashing', () => {
		expect(() => {
			const div = document.createElement('div');
			ReactDOM.render(<App/>, div);
		}).not.toThrow();
	});
});