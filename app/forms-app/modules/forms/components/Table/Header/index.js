import React, { Component, PropTypes } from 'react';

import Row from '../Body/Row';
import Column from './Column';
import Dropdown from './Dropdown';

export default class Header extends Component {
	static propTypes = {
		activeOptions: PropTypes.array,
		header: PropTypes.array.isRequired,
		pickDropdownOption: PropTypes.func
	};

	constructor(props) {
		super(props);
	};

	render() {
		const {
			activeOptions,
			header,
			pickDropdownOption
		} = this.props;

		return (
			<thead>
				<Row>
					{
						header.map((h, i) => {
							let content = h.title;

							/* if has options, render col-dropdown */
							if (Array.isArray(h)) {
								content = <Dropdown
									activeIndex={activeOptions[i]}
									onChange={pickDropdownOption.bind(null, i)}
									options={h}
								/>;
							}

							return (
								<Column key={i} >
									{content}
								</Column>
							);
						})
					}
				</Row>
			</thead>
		);
	}
}