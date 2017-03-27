import React, { Component, PropTypes } from 'react';

import tables from '../modules/tables';
import { org, personal } from '../modules/tables/utils/sets';

const Table = tables.components.Table;

export default class FormsTable extends Component {

  constructor(props) {
    super(props);

    this.rowClickHandler = this.rowClickHandler.bind(this);
  }

  render() {
    const {
      table
    } = this.props;

    return (
      <div>
        <Table
          data={this.props.forms}
          header={
            table === "personal" ?
            personal(this) :
            org(this)
          }
          onRowClick={this.rowClickHandler}
          onSort={(key, type) => {
            this.props.sortHandler(table, key, type);
          }}
          sort={this.props.sort}
        />
      </div>
    );
  }

  redirect(uri) {
    document.location.pathname = uri;
  }

  rowClickHandler(formId) {
    this.redirect(`/forms/${formId}/preview`);
  }

}