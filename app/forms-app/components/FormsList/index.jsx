import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FormsList from './FormsList';
import formsLists from '../../modules/formsLists';

const getSortedEntries = formsLists.selectors.makeGetSortedEntries();

const mapStateToProps = (state, props) => {
  return {
    entries: getSortedEntries(state, props),
    sort: formsLists.selectors.getSort(state, props),
  }
};

const mapDispatchToProps = {
  onSort: formsLists.actions.sortClient
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsList)