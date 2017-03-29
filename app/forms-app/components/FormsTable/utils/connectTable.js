import { connect } from 'react-redux';

import forms from '../../../modules/forms';
import tables from '../../../modules/tables';

export default function connectTable(WrappedComponent, tableID) {

  const sortSelector = tables.selectors.makeSortSelector(tableID);
  const filterSelector = tables.selectors.makeFilterSelector(tableID);
  const formsSelector = forms.selectors.makeFormsSelector(
    sortSelector,
    filterSelector
  );

  const mapStateToProps = (state) => {
    return {
      tableID: tableID,
      sort: sortSelector(state),
      filter: filterSelector(state),
      forms: formsSelector(state),
    }
  };

  const mapDispatchToProps = {
    sortHandler: tables.actions.sort,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}