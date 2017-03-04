import React, { Component, PropTypes } from 'react';

export default class Attribute extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      label,
      value
    } = this.props;

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <span style={{paddingRight: '5px', fontWeight: 'bold'}}>{label + ':'}</span>
          <span>{value}</span>
        </div>
      </div>
    );
  }
}