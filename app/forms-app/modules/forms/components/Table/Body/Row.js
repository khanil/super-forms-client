import React, { Component, PropTypes } from 'react';

export default class Row extends Component {
  static propTypes = {
  
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
    } = this.props;

    return (
      <tr>
        {this.props.children}
      </tr>
    );
  }
}