import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import { getEntity } from '../../modules/entities/selectors';

const mapStateToProps = (state, props) => {
  const form = getEntity(state, "forms", props.id);
  const user = getEntity(state, "users", form.user_id);

  return {
    data: {
      ...form,
      user,
    },
  }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Form)