import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Body from './Body';

export default class Table extends Component {
	static propTypes = {
		data: PropTypes.array,
		header: PropTypes.array.isRequired
	};

	static defaultProps = {
		data: [],
		header: []
	};

	state = {
		activeOptions: []
	};

	constructor(props) {
		super(props);

		this.pickDropdownOption = this.pickDropdownOption.bind(this);
	};

	render() {
		const {
			data,
			header
		} = this.props;

		const activeOptions = this.state.activeOptions;

		return (
			<div className='table-responsive super-table'>
				<table className='table table-hover table-bordered'>
					<Header
						activeOptions={activeOptions}
						header={header}
						pickDropdownOption={this.pickDropdownOption}
					/>
					<Body
						columns={this.getActiveColumns(header, activeOptions)}
						data={data}
					/>
				</table>
			</div>
		);
	};

	getActiveColumns(header, activeOptions) {
		return header.map((col, i) => {
			/* if column has options, get active */
			if (Array.isArray(col)) {
				let optionN = activeOptions[i] || 0;
				return col[optionN];
			}
			return col;
		});
	};

	pickDropdownOption(columnN, optionN) {
		this.setState((state) => (
			{
				activeOptions: Object.assign([], state.activeOptions, {
					[columnN]: optionN
				})
			}
		));
	}
}