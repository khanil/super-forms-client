import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import { getEntity } from '../../../modules/entities/selectors';
import { show as showModal } from '../../../modules/modal/actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(Form)