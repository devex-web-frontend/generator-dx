import * as React from 'react';
import { themr, ThemeProvider } from 'react-css-themr';
import { Collection } from 'dx-util/src/collection/Collection';
import { ComponentClass, SFC } from 'react';
import * as css from './app.component.styl';
import { CONTEXT_THEME } from '../../config/theme.config';

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
			Hi!
		</section>
	</ThemeProvider>
);

type TAppProps = TOwnAppProps & Partial<TInjectedAppProps>;
export const App: ComponentClass<TAppProps> = themr(Symbol(), css)(RawApp);