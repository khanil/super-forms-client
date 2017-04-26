import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import FormsTable from './FormsTable';
import search from '../modules/search';
import session from '../modules/session';
import formsLists from '../modules/formsLists';

import { personal, org } from './FormsTable/utils/sets';

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

const Search = search.component;
const getForms = formsLists.selectors.makeGetForms();

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

	componentWillMount() {
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
          <FormsTable
            key={"org"}
            generateHeader={org}
            list={"org"}
            showModal={this.props.showModal}
          /> :
          <FormsTable
            key={"personal"}
            generateHeader={personal}
            list={"personal"}
            showModal={this.props.showModal}
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
