import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FormsList from './FormsList';
import EL from '../../modules/entityLists';

const makeMapStateToProps = () => {
  console.log("make mapStateToProps");

  let getSortedEntries;
  let lastEntities;

  const mapStateToProps = (state, props) => {
    const entities = EL.selectors.getProperty(state, props.list, "entities");

    if (!getSortedEntries || lastEntities != entities) {
      getSortedEntries = EL.selectors.makeGetSortedEntries(entities);
      lastEntities = entities;
    }

    return {
      entries: getSortedEntries(state, props),
      keyEntity: EL.selectors.getProperty(state, props.list, "keyEntity"),
      sort: EL.selectors.getSort(state, props),
    }
  };
  return mapStateToProps;
}

const mapDispatchToProps = {
  onSort: EL.actions.sortEntries
};

export default connect(makeMapStateToProps, mapDispatchToProps)(FormsList)