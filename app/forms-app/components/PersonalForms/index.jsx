import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { personal } from '../FormsTable/utils/sets';
import FormsTable from '../FormsTable';
import forms from '../../modules/forms';
import tables from '../../modules/tables';

const tableID = "personal";

const sortSelector = tables.selectors.makeSortSelector(tableID);
const formsSelector = forms.selectors.makeUserFormsSelector(sortSelector);

const mapStateToProps = (state) => {
  return {
    forms: formsSelector(state),
    sort: sortSelector(state),
    tableID: tableID,
  }
};

const mapDispatchToProps = {
  sortHandler: tables.actions.sort,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PersonalForms extends Component {

  render() {
    const {
      filter,
      forms,
      showModal,
      sort,
      sortHandler,
      tableID,
    } = this.props;

    return (
      <div>
        <FormsTable
          generateHeader={personal}
          forms={forms}
          showModal={showModal}
          sort={sort}
          sortHandler={sortHandler.bind(null, tableID)}
          tableID={tableID}
        />
      </div>
    );
  }
}