import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputString extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, changeHandler, blurHandler, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <input type="text" disabled={disabled} className="form-control" value={value} onChange={changeHandler} onBlur={blurHandler} placeholder={placeholder}/>
    );
  }
}