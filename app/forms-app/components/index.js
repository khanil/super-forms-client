import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import FormsTable from './FormsTable';
import search from '../modules/search';
import session from '../modules/session';
import userForms from '../modules/userForms';

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

const mapStateToProps = (state) => {
	const {
		activeTab,
		user
	} = session.selectors.getAll(state);

  const searchResult = search.selectors.getResult(state);

	const forms = userForms.selectors.getUsersForms(
		state,
		(activeTab == "personal") ? [user] :
      (!searchResult) ? ["all"] : searchResult
	);

  return {
    activeTab,
    forms
  }
};

const mapDispatchToProps = {
  tabChangeHandler: session.actions.changeTab,
  fetchUserForms: userForms.actions.fetch,
  searchHandler: search.actions.search,
  searchClearHandler: search.actions.clear,
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
          active={this.props.activeTab}
          clickHandler={this.tabChangeHandler}
          tabs={tabs}
        />

        {
          this.props.activeTab == "org" ?
          <Search
            onClear={this.props.searchClearHandler}
            onSearch={this.props.searchHandler}
          /> :
          null
        }

				<FormsTable
          generateHeader={
          	this.props.activeTab == "org" ?
          	org :
          	personal
          }
          forms={this.props.forms}
          showModal={this.props.showModal}
          sort={
          	{
          		key: 'index',
					    type: 'number',
					    order: 'desc',
          	}
          }
          sortHandler={() => {}}
        />
			</div>
		);
	}

	tabChangeHandler(tab) {
		if (tab !== this.props.activeTab) {
			this.props.tabChangeHandler(tab);
		}
	}
}
