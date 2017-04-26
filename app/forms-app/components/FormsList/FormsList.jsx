import React, { Component, PropTypes } from 'react';
import ConnectedForm from './ConnectedForm';
import Header from './Header';

export default class FormsList extends Component {
  static propTypes = {
    list: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    sort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
  }

  state = {
    activeColumns: this.initActiveColumns(this.props.columns)
  }

  constructor(props) {
    super(props);

    this.changeActiveColumn = this.changeActiveColumn.bind(this);
  }

  render() {
    const {
      list,
      columns,
      entries,
      sort,
      onSort,
    } = this.props;
    const {
      activeColumns
    } = this.state;

    return (
      <table className="table table-bordered">
        <Header
          columns={columns}
          activeColumns={activeColumns}
          sort={sort}
          onColumnChange={this.changeActiveColumn}
          onSort={onSort.bind(null, list)}
        />

        <tbody>
          {
            entries.map((id) => (
              <ConnectedForm
                key={id}
                id={id}
                columns={activeColumns}
              />
            ))
          }
        </tbody>
      </table>
    );
  }

  initActiveColumns(columns) {
    return columns.map((column) => {
      if (Array.isArray(column)) {
        return column[0];
      }

      return column;
    })
  }

  changeActiveColumn(columnPos, nextColumn) {
    const activeColumns = this.state.activeColumns;

    this.setState({
      activeColumns: [
        ...activeColumns.slice(0, columnPos),
        nextColumn,
        ...activeColumns.slice(columnPos + 1)
      ]
    });
  }
}