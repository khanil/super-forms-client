import React, { Component, PropTypes } from 'react';

import ConnectedForm from './ConnectedForm';
import EmptyList from './EmptyList';

export default class Body extends Component {
  static propTypes = {
    actions: PropTypes.func,
    columns: PropTypes.array.isRequired,
    emptyMessage: PropTypes.any,
    entries: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      actions,
      columns,
      emptyMessage,
      entries
    } = this.props;

    if (!entries || entries.length == 0) {
      return this.renderEmptyList();
    }

    return (
      <tbody>
        {
          entries.map((id) => (
            <ConnectedForm
              key={id}
              id={id}
              columns={columns}
              actions={actions}
            />
          ))
        }
      </tbody>
    );
  }

  renderEmptyList() {
    const {
      actions,
      columns,
      emptyMessage,
    } = this.props;
    const isActions = actions ? 1 : 0;
    const width = columns.length + isActions;

    return (
      <EmptyList
        message={emptyMessage}
        width={width}
      />
    );
  }
}