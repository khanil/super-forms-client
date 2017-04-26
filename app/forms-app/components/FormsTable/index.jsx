import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import formsLists from '../../modules/formsLists';
import tables from '../../modules/tables';

const Table = tables.components.Table;
// const getForms = formsLists.selectors.makeGetForms();

const mapStateToProps = (state, ownProps) => {
  return {
    forms: getForms(state, ownProps),
    sort: {
      key: formsLists.selectors.getSortKey(state, ownProps),
      order: formsLists.selectors.getSortDirection(state, ownProps),
    },
  }
};

const mapDispatchToProps = {
  sortHandler: formsLists.actions.sortClient
};

@connect(mapStateToProps, mapDispatchToProps)
export default class FormsTable extends Component {

  static propTypes = {
    generateHeader: PropTypes.func.isRequired,
    forms: PropTypes.array,
    sort: PropTypes.shape({
      key: PropTypes.string,
      type: PropTypes.string,
      order: PropTypes.oneOf(['asc', 'desc']),
    }),
    sortHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    forms: []
  }

  constructor(props) {
    super(props);

    this.header = this.props.generateHeader(this);

    this.rowClickHandler = this.rowClickHandler.bind(this);
  }

  render() {
    return (
      <Table
        data={this.props.forms}
        header={this.header}
        onRowClick={this.rowClickHandler}
        onSort={this.props.sortHandler.bind(null, this.props.list)}
        sort={this.props.sort}
      />
    );
  }

  redirect(uri) {
    document.location.pathname = uri;
  }

  rowClickHandler(formId) {
    this.redirect(`/forms/${formId}/preview`);
  }

}