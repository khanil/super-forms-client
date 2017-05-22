import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Body from './Body';

export default class FormsList extends Component {
  static propTypes = {
    actions: PropTypes.func,
    columns: PropTypes.array.isRequired,
    emptyMessage: PropTypes.any,
    entries: PropTypes.array.isRequired,
    list: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    sort: PropTypes.object.isRequired,
  }

  state = {
    activeColumns: this.initActiveColumns(this.props.columns),
  }

  constructor(props) {
    super(props);

    this.changeActiveColumn = this.changeActiveColumn.bind(this);
  }

  render() {
    const {
      actions,
      columns,
      emptyMessage,
      entries,
      list,
      onSort,
      sort,
    } = this.props;
    const {
      activeColumns,
    } = this.state;

    return (
      <div>
        <table className="table table-bordered">
          <Header
            columns={columns}
            activeColumns={activeColumns}
            sort={sort}
            actionsColumn={this.props.actions !== undefined}
            onColumnChange={this.changeActiveColumn}
            onSort={onSort.bind(null, list)}
          />

          <Body
            actions={actions}
            columns={activeColumns}
            entries={entries}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>
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