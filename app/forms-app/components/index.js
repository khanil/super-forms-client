import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from '../../../src/components/Journal/Tabs';
import OrganisationForms from './OrganisationForms';
import PersonalForms from './PersonalForms';

// console.log(tableHOC(FormsTable, "personal"));

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
					tabs={["personal", "org"]}
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
