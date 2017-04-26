import React, { Component, PropTypes } from 'react';

import Dropdown from './Dropdown';
import Column from './Column';

export default class Header extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    activeColumns: PropTypes.array.isRequired,
    sort: PropTypes.Object,
    onColumnChange: PropTypes.func,
    onSort: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.isMultyColumn = this.isMultyColumn.bind(this);
  }

  render() {
    const {
      columns,
      activeColumns,
      sort,
      onColumnChange,
      onSort,
    } = this.props;

    return (
      <thead>
        <tr>
          {
            activeColumns.map((column, columnPos) => (
              <Column
                key={column.key}
                sortKey={column.key}
                onClick={onSort}
                sorted={column.key === sort.sortKey}
                sort={
                  column.key === sort.sortKey ?
                  sort :
                  undefined
                }
              >
                {
                  this.isMultyColumn(columnPos) ?
                    <Dropdown
                      active={column}
                      options={columns[columnPos]}
                      onChange={onColumnChange.bind(null, columnPos)}
                    /> :
                    column.title
                }
              </Column>
            ))
          }
        </tr>
      </thead>
    );
  }

  isMultyColumn(colKey) {
    return Array.isArray(this.props.columns[colKey]);
  }
}