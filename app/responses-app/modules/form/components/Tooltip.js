import React, { Component, PropTypes } from 'react';

export default class Tooltip extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span
        className='glyphicon glyphicon-info-sign description'
        aria-hidden='true'
        title={this.props.text}
      >
      </span>
    );
  }
}