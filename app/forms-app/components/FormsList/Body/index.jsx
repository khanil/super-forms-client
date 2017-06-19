import React, { Component, PropTypes } from 'react';

import ConnectedForm from './ConnectedForm';
import EmptyList from './EmptyList';
import Spinner from '../../../modules/modal/components/commons/Spinner';

export default class Body extends Component {
  static propTypes = {
    actions: PropTypes.func,
    columns: PropTypes.array.isRequired,
    emptyMessage: PropTypes.any,
    entries: PropTypes.array.isRequired,
    keyEntity: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      actions,
      columns,
      emptyMessage,
      entries,
      keyEntity,
      list,
      isLoading,
    } = this.props;

    if (!entries || entries.length == 0) {
      return this.renderEmptyList();
    }

    return (
      <tbody>
        {
          entries.map((entry) => {
            const entryKey = entry[keyEntity];

            return (
              <ConnectedForm
                key={entryKey}
                entryKey={entryKey}
                entry={entry}
                columns={columns}
                actions={actions}
                keyEntity={keyEntity}
                list={list}
              />
            );
          })
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