import './<%= componentName %>.page.styl';

import React from 'react';
import <%= componentTag %> from './<%= componentName %>.jsx';

export default React.createClass({
	render() {
		return (
			<section className="testWrap">
				<<%= componentTag %>/>
			</section>
		);
	}
});
