import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModalHOC from '../modules/modal/components/HOC';
import Tabs from './Tabs';
import formsLists from '../modules/formsLists';
import session from '../modules/session';

import FormsList from './FormsList';
import {
  ActionsForOrg,
  ActionsForPerson,
  personal,
  org,
} from '../utils';

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
    view: session.selectors.getTab(state),
  }
};

const mapDispatchToProps = {
  switchList: formsLists.actions.switchList,
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

	render() {
		return (
			<div>
        <Tabs
          active={this.props.view}
          clickHandler={this.tabChangeHandler}
          tabs={tabs}
        />

        {
          this.props.view == "org" ?
          <FormsList
            key="org"
            actions={ActionsForOrg}
            columns={org}
            list="org"
          /> :
          <FormsList
            key="personal"
            actions={ActionsForPerson}
            columns={personal}
            emptyMessage={"Не создано ни одной формы"}
            list="personal"
          />
        }

			</div>
		);
	}

	tabChangeHandler(tab) {
		if (tab !== this.props.view) {
			this.props.switchList(tab);
      // this.setState({
   //      view: tab
   //    });
		}
	}
}
