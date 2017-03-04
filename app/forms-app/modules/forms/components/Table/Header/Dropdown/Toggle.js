import React, { PropTypes } from 'react';

Toggle.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default function Toggle(props) {
	return (
		<span
			className='dropdown-toggle'
			onClick={props.onClick}
		>
			{props.children}
		</span>
	);
}