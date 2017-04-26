import React, { PropTypes } from 'react';

Menu.propTypes = {
	isOpen: PropTypes.bool
}

Menu.defaultProps = {
	isOpen: false
}

export default function Menu(props) {
	return (
		<ul
			className='dropdown-menu'
			style={props.isOpen ? show : null}
		>
			{props.children}
		</ul>
	);
}

const show = {
	display: 'block'
};
