import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FormsList from './FormsList';
import formsLists from '../../modules/formsLists';

const makeMapStateToProps = () => {
  console.log("make mapStateToProps");

  let getSortedEntries;
  let lastEntities;

  const mapStateToProps = (state, props) => {
    const entities = formsLists.selectors.getConnectedEntities(state, props);

    if (!getSortedEntries || lastEntities != entities) {
      getSortedEntries = formsLists.selectors.makeGetSortedEntries(entities);
      lastEntities = entities;
    }

    return {
      entries: getSortedEntries(state, props),
      keyEntity: formsLists.selectors.getKeyEntity(state, props),
      sort: formsLists.selectors.getSort(state, props),
      isLoading: formsLists.selectors.getLoading(state, props),
    }
  };
  return mapStateToProps;
}

const mapDispatchToProps = {
  onSort: formsLists.actions.sortClient
};

export default connect(makeMapStateToProps, mapDispatchToProps)(FormsList)