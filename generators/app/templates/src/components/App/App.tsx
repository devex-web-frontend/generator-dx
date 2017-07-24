import * as React from 'react';
import { themr, ThemeProvider } from 'react-css-themr';
import { ComponentClass, SFC } from 'react';
import * as css from './App.styl';
import { CONTEXT_THEME } from '../../config/theme.config';
import Button from 'dx-components/src/components/Button/Button';

type TOwnAppProps = {};
type TInjectedAppProps = {
	theme: {
		container?: string
	}
};

type TFullAppProps = TOwnAppProps & TInjectedAppProps;

const RawApp: SFC<TFullAppProps> = props => (
	<ThemeProvider theme={CONTEXT_THEME}>
		<section className={props.theme.container}>
			<Button>Hi</Button>
		</section>
	</ThemeProvider>
);

type TAppProps = TOwnAppProps & Partial<TInjectedAppProps>;
export const App: ComponentClass<TAppProps> = themr(Symbol(), css)(RawApp);