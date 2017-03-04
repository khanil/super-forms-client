import React, { Component, PropTypes } from 'react';

export default class Column extends Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<td>
				{this.props.children}
			</td>
		);
	}
}