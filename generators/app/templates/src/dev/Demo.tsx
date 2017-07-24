import * as React from 'react';
import { themr, ThemeProvider } from 'react-css-themr';
import * as css from './Demo.styl';
import { CONTEXT_THEME } from '../config/theme.config';

type TDemoOwnProps = {
	children?: React.ReactNode
};

type TDemoInjectedProps = {
	theme: {
		container?: string
	}
};

type TFullDemoProps = TDemoProps & TDemoInjectedProps;

const DemoComponent: React.SFC<TFullDemoProps> = props => (
	<section className={props.theme.container}>
		{props.children}
	</section>
);

type TDemoProps = TDemoOwnProps & Partial<TDemoInjectedProps>;
const ThemedDemoComponent: React.ComponentClass<TDemoProps> = themr(Symbol(), css)(DemoComponent);

export const Demo: React.SFC<TDemoProps> = props => (
	<ThemeProvider theme={CONTEXT_THEME}>
		<ThemedDemoComponent theme={props.theme}>
			{props.children}
		</ThemedDemoComponent>
	</ThemeProvider>
);

//export default for dx-components and dx-ui
export default Demo;