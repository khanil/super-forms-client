import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import FormsTable from './FormsTable';
import PersonalForms from './PersonalForms';
import OrganisationForms from './OrganisationForms';
import forms from '../modules/forms';
import session from '../modules/session';
import tables from '../modules/tables';
import userForms from '../modules/userForms';

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

const mapStateToProps = (state) => {
  return {
    session: session.selectors.getAll(state),
  }
};

const mapDispatchToProps = {
  fetchForms: forms.actions.fetch,
  resetTable: tables.actions.reset,
  tabChangeHandler: session.actions.changeTab,
  fetchUserForms: userForms.actions.fetch,
};

@ModalHOC
@connect(mapStateToProps, mapDispatchToProps)
export default class FormsListApp extends Component {

	constructor(props) {
		super(props);

		this.tabChangeHandler = this.tabChangeHandler.bind(this);
	}

	componentWillMount() {
		this.props.fetchUserForms();
	}

	render() {
		return (
			<div>
				<Tabs
					active={this.props.session.activeTab}
					clickHandler={this.tabChangeHandler}
					tabs={tabs}
				/>

				{
					this.props.session.activeTab == "personal" ?
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
		if (tab !== this.props.session.activeTab) {
			this.props.tabChangeHandler(tab);
		}

		this.props.resetTable(this.props.session.activeTab);

		if (tab == "org") {
			this.props.fetchForms();
		}
	}
}
