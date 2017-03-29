import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import FormsTable from './FormsTable';
import PersonalForms from './PersonalForms';
import OrganisationForms from './OrganisationForms';

const tabs = [
	{
		key: "org",
		label: "ВСЕ ФОРМЫ",
	},
	{
		key: "personal",
		label: "МОИ ФОРМЫ",
	},
];

@ModalHOC
export default class FormsListApp extends Component {

	state = {
		tab: "personal"
	};

	constructor(props) {
		super(props);

		this.tabChangeHandler = this.tabChangeHandler.bind(this);
	}

	render() {
		return (
			<div>
				<Tabs
					active={this.state.tab}
					clickHandler={this.tabChangeHandler}
					tabs={tabs}
				/>

				{
					this.state.tab == "personal" ?
						<PersonalForms
							showModal={this.props.showModal}
						/> :
						<OrganisationForms
							showModal={this.props.showModal}
						/>
				}

			</div>
		);
	}

	tabChangeHandler(tab) {
		this.setState({
			tab
		});
	}
}
