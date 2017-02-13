import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputString extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, changeHandler, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <input type="text" disabled={disabled} className="form-control" value={value} onChange={changeHandler} placeholder={placeholder}/>
    );
  }
}