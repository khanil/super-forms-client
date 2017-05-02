import React, { Component, PropTypes } from 'react';

import FormAttribute from './FormAttribute';

export default class Form extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array,
    actions: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.renderActionsPanel = this.renderActionsPanel.bind(this);
  }

  render() {
    const {
      id,
      data,
      columns
    } = this.props;

    return (
      <tr>
        {
          columns.map((column) => (
            <FormAttribute
              key={`${id}-${column.key}`}
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
}