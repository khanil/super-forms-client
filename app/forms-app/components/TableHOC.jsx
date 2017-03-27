import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import forms from '../modules/forms';
import tables from '../modules/tables';

export default function tableHOC(WrappedComponent, tableId) {

  const sortSelector = tables.selectors.makeSortSelector(tableId);
  const formsSelector = forms.selectors.makeFormsSelector(sortSelector);

  const mapStateToProps = (state) => {
    return {
      table: tableId,
      sort: sortSelector(state),
      forms: formsSelector(state),
    }
  };

  const mapDispatchToProps = {
    sortHandler: tables.actions.sort,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}