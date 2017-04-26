import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import formsLists from '../modules/formsLists';

import FormsList from './FormsList';

import { personal, org, test } from './FormsTable/utils/sets';

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

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = {
  fetchOrgForms: formsLists.actions.fetchOrg,
  fetchUserForms: formsLists.actions.fetchUser,
};

@ModalHOC
@connect(mapStateToProps, mapDispatchToProps)
export default class FormsListApp extends Component {

  state = {
    view: "org"
  }

	constructor(props) {
		super(props);

		this.tabChangeHandler = this.tabChangeHandler.bind(this);
	}

	componentDidMount() {
		this.props.fetchOrgForms("org");
    this.props.fetchUserForms("personal");
	}

	render() {
		return (
			<div>
        <Tabs
          active={this.state.view}
          clickHandler={this.tabChangeHandler}
          tabs={tabs}
        />

        {
          this.state.view == "org" ?
          <FormsList
            key={"org"}
            list={"org"}
            columns={org}
          /> :
          <FormsList
            key={"personal"}
            list={"personal"}
            columns={personal}
          />
        }

			</div>
		);
	}

	tabChangeHandler(tab) {
		if (tab !== this.state.view) {
			this.setState({
        view: tab
      });
		}
	}
}
