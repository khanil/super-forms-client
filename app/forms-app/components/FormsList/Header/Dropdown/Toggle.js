import React, { PropTypes } from 'react';

Toggle.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default function Toggle(props) {
	return (
		<button
			className='dropdown-toggle btn btn-default'
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}