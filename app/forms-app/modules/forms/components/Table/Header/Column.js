import React, { Component, PropTypes } from 'react';

import Column from '../Body/Column';

export default class HeaderColumn extends Column {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<th>
				{this.props.children}
			</th>
		);
	}
}