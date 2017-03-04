import React, { PropTypes } from 'react';

Option.propTypes = {
	content: PropTypes.any,
	onClick: PropTypes.func
}

export default function Option(props) {
	return (
		<li onClick={props.onClick} >
			<a href='#'>
				{props.content}
			</a>
		</li>
	);
}