import * as React from 'react';
import { themr } from 'react-css-themr';
import { Collection } from 'dx-util/src/collection/Collection';
import { ComponentClass, SFC } from 'react';
import * as css from './app.component.styl';

type TOwnAppProps = {};
type TInjectedAppProps = {
	theme: {
		container?: string
	}
};

type TFullAppProps = TOwnAppProps & TInjectedAppProps;

const RawApp: SFC<TFullAppProps> = props => (
	<section className={props.theme.container}>
		Hi!
	</section>
);

type TAppProps = TOwnAppProps & Partial<TInjectedAppProps>;
export const App: ComponentClass<TAppProps> = themr(Symbol(), css)(RawApp);