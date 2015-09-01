import React from 'react';

import './<%= componentName %>.styl';
import './<%= componentName %>.looks.styl';

export default React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		attributes: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			attributes: {}
		};
	},

	render() {
		return (
			<div className="<%= componentName %>" {...this.props.attributes}>
					{this.props.children}
			</div>
		);
	}
});
