import { BUTTON } from 'dx-components/src/components/Button/Button';
import * as dxcButtonCss from 'dx-components/src/components/Button/Button.styl';
import * as buttonCss from '../components/Button/Button.styl';
import { themeable } from 'react-css-themr';

export const CONTEXT_THEME = {
	[BUTTON]: themeable(dxcButtonCss, buttonCss)
};