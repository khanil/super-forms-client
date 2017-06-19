import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import { getEntity } from '../../../modules/entities/selectors';
import { makeGetEntry, getProperty } from '../../../modules/entityLists/selectors';
import { show as showModal } from '../../../modules/modal/actions';

const makeMapStateToProps = () => {
  let getEntry;
  let lastEntities;
  const mapStateToProps = (state, props) => {
    const entities = getProperty(state, props.list, "entities");

    if (!getEntry || lastEntities != entities) {
      getEntry = makeGetEntry(entities);
      lastEntities = entities;
    }

    return {
      data: getEntry(state, props)
    }
  }
  return mapStateToProps;
}

const mapStateToProps = (state, props) => {
  const entry = props.entry;
  let data = {};
  Object.keys(entry).forEach((entity) => {
    let entityId = entry[entity];
    data[entity] = getEntity(state, entity, entityId);
  });

  return {
    data,
  }
};

const mapDispatchToProps = {
  showModal
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Form)