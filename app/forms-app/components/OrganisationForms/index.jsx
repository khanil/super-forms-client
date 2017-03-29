import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { org } from '../FormsTable/utils/sets';
import FormsTable from '../FormsTable';
import SearchBar from './SearchBar';
import forms from '../../modules/forms';
import tables from '../../modules/tables';

const tableID = "org";

const sortSelector = tables.selectors.makeSortSelector(tableID);
const filterSelector = tables.selectors.makeFilterSelector(tableID);
const formsSelector = forms.selectors.makeFormsSelector(
  sortSelector,
  filterSelector
);

const mapStateToProps = (state) => {
  return {
    filter: filterSelector(state),
    forms: formsSelector(state),
    sort: sortSelector(state),
    tableID: tableID,
  }
};

const mapDispatchToProps = {
  filterHandler: tables.actions.filter,
  sortHandler: tables.actions.sort,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class OrganisationForms extends Component {

  render() {
    const {
      filter,
      forms,
      showModal,
      sort,
      filterHandler,
      sortHandler,
      tableID,
    } = this.props;

    return (
      <div>
        <SearchBar
          onSearch={filterHandler.bind(null, tableID)}
        />

        <FormsTable
          generateHeader={org}
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