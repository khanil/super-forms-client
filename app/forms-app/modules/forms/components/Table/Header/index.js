import React, { Component, PropTypes } from 'react';

import Row from '../Body/Row';
import Column from './Column';
import Dropdown from './Dropdown';

export default class Header extends Component {
	static propTypes = {
		activeOptions: PropTypes.array,
		header: PropTypes.array.isRequired,
		pickDropdownOption: PropTypes.func,
		onSort: PropTypes.func,
		sort: PropTypes.shape({
			field: PropTypes.string,
			type: PropTypes.string,
			dir: PropTypes.oneOf(['asc', 'desc']),
		}),
	};

	constructor(props) {
		super(props);
	};

	render() {
		const {
			activeOptions,
			header,
			pickDropdownOption,
			onSort,
			sort,
		} = this.props;

		return (
			<thead>
				<Row>
					{
						header.map((h, i) => {
							let content = h.title;
							let hCfg = h;

							/* if has options, render col-dropdown */
							if (Array.isArray(h)) {
								content = (
									<Dropdown
										activeIndex={activeOptions[i]}
										onChange={pickDropdownOption.bind(null, i)}
										options={h}
									/>
								);

								hCfg = h[activeOptions[i] || 0];
							}

							return (
								<Column
									key={i}
									onClick={
										//Exclude controls column
										hCfg.key !== 'control' ?
										onSort.bind(null, hCfg.key, hCfg.compareType) :
										null
									}
									sort={
										sort.field === hCfg.key ?
										sort :
										undefined
									}
								>
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