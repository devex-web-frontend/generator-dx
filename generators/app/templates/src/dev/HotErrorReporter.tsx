import * as React from 'react';
import * as RawRedBox from 'redbox-react';

export const RedBox: typeof RawRedBox = props => {
	const {error} = props;
	if (error) {
		console.error(error.message, error.stack);
	}
	return (
		<RawRedBox error={error}/>
	);
};