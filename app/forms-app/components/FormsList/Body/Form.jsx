import React, { Component, PropTypes } from 'react';

import FormAttribute from './FormAttribute';

export default class Form extends Component {
  static propTypes = {
    entryKey: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array,
    actions: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.renderActionsPanel = this.renderActionsPanel.bind(this);
    this.isDeleted = this.isDeleted.bind(this);
  }

  render() {
    const {
      entryKey,
      data,
      columns
    } = this.props;

    if (this.isDeleted())
      return null;

    return (
      <tr>
        {
          columns.map((column) => (
            <FormAttribute
              key={`${entryKey}-${column.key}`}
              column={column}
              data={data}
            />
          ))
        }
        { this.renderActionsPanel() }
      </tr>
    );
  }

  renderActionsPanel() {
    if (!this.props.actions)
      return null;

    const ActionsComponent = this.props.actions;
    return (
      <ActionsComponent
        data={this.props.data}
        showModal={this.props.showModal}
      />
    );
  }

  isDeleted() {
    return this.props.data.isDeleted === true;
  }
}