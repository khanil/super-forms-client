import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu';
import Option from './Option';
import Toggle from './Toggle';

export default class Dropdown extends Component {
	static propTypes = {
		active: PropTypes.number,
		options: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired
	};

	static defaultProps = {
		options: [],
		onChange: () => {}
	};

	state = {
		isOpen: false
	};

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	};

	componentWillUpdate(nextProps, nextState) {
		if (nextState.isOpen) {
			document.addEventListener('click', this.handleClickOutside, false);
		} else {
			document.removeEventListener('click', this.handleClickOutside, false);
		}
	};

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside, false);
	};

	render() {
		const {
			active,
			options
		} = this.props;

		const isOpen = this.state.isOpen;

		return (
			<div className='dropdown'>
				<Toggle onClick={ disablePropagation(this.toggle) }>
					<span>
						{active.title}
						<button className='btn btn-default'>
							<i className={`fa fa-sort-${isOpen ? 'asc' : 'desc'}`} />
						</button>
					</span>
				</Toggle>
				<Menu isOpen={this.state.isOpen}>
					{
						options.map((o, i) => (
							<Option
								key={i}
								content={o.title}
								onClick={ disablePropagation( this.pick.bind(this, i) ) }
							/>
						))
					}
				</Menu>
			</div>
		);
	}

	toggle() {
		this.setState(({isOpen}) => (
			{
				isOpen: !isOpen
			}
		));
	}

	pick(optionIndex) {
		if (this.props.options[optionIndex] !== this.props.active)
			this.props.onChange(this.props.options[optionIndex]);

		this.toggle();
	}

	handleClickOutside(e) {
		if (!ReactDOM.findDOMNode(this).contains(e.target)) {
			this.toggle();
		}
	}
}

function disablePropagation(callback) {
	return e => {
		e.stopPropagation();
		callback();
	}
}