import React, { Component, PropTypes } from 'react';

import tables from '../../modules/tables';
const Table = tables.components.Table;

export default class FormsTable extends Component {

  static propTypes = {
    generateHeader: PropTypes.func.isRequired,
    forms: PropTypes.array,
    sort: PropTypes.shape({
      key: PropTypes.string,
      type: PropTypes.string,
      order: PropTypes.oneOf(['asc', 'desc']),
    }),
    tableID: PropTypes.string.isRequired,
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
    const {
      tableID
    } = this.props;

    return (
      <Table
        data={this.props.forms}
        header={this.header}
        onRowClick={this.rowClickHandler}
        onSort={this.props.sortHandler}
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