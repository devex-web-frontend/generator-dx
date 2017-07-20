import * as React from 'react';
import { themr } from 'react-css-themr';

const RawApp: React.SFC<{}> = () => (
	<section>Hi!</section>
);

export const App = themr(Symbol())(RawApp);