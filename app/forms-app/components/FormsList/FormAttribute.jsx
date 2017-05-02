import React, { Component, PropTypes } from 'react';

export default class FormAttribute extends Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderValue = this.renderValue.bind(this);
  }

  render() {
    const {
      column,
      data,
    } = this.props;

    return (
      <td>
        { this.renderValue() }
      </td>
    );
  }

  renderValue() {
    const {
      column,
      data
    } = this.props;

    if (!column.render) {
      return data[column.key];
    }

    return column.render(data);
  }
}