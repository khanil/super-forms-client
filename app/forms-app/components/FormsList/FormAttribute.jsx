import React, { Component, PropTypes } from 'react';

export default class FormAttribute extends Component {
  static propTypes = {
    attribute: PropTypes.string,
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      attribute,
      data,
    } = this.props;

    return (
      <td>
        { data[attribute] }
      </td>
    );
  }
}