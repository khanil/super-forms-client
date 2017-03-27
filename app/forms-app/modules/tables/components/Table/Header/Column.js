import React, { Component, PropTypes } from 'react';

import Column from '../Body/Column';
import SortIcon from './SortIcon';

export default class HeaderColumn extends Column {
	static propTypes = {
		...Column.propTypes,
		onClick: PropTypes.func,
		sort: PropTypes.shape({
			key: PropTypes.string,
			type: PropTypes.string,
			order: PropTypes.oneOf(['asc', 'desc']),
		}),
	}

	constructor(props) {
		super(props);

		this.clickHandler = this.clickHandler.bind(this);
	}

	render() {
		const {
			sort,
			onClick,
		} = this.props;

		return (
			<th
				ref={(el) => { this._element = el; }}
				onClick={onClick ? this.clickHandler : null}
			>
				{this.props.children}

				{
					sort ?
					<SortIcon config={sort} /> :
					null
				}
			</th>
		);
	}

	clickHandler(event) {
		let target = event.target;

		while (target !== this._element) {
      if (target.classList.contains('dropdown')) {
        return;
      }
      target = target.parentNode;
    }

    this.props.onClick();
	}
}