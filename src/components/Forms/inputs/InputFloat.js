import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'throttle-debounce/debounce';
import shallowCompare from 'react-addons-shallow-compare';

export default class InputFloat extends Component {

  state = {
    value: this.props.model.toJS().value || ''
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.debouncedSaveToRedux = debounce(300, this.props.model.toJS().changeHandler);
    this.debouncedAssignZerosAfterDot = debounce(300, this.assignZerosAfterDot.bind(this));
    this.updateCaretPosition = this.updateCaretPosition.bind(this);
  };

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState);
    return shouldUpdate;
  }

  render() {
    const {
      value, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <div className='input-group'>
        <span
          className="input-group-addon"
          title="Десятичное дробное число"
        >
          .00
        </span>
        <input
          type="text"
          className="form-control"
          disabled={disabled}
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange(e) {
    const input = e.target;
    let value = input.value;
    const caretPos = input.selectionStart;

    this.setState({
      value: value
    }, () => {
      this.debouncedAssignZerosAfterDot(this.state.value, caretPos);
      this.debouncedSaveToRedux(this.state.value);
    });
  }

  assignZerosAfterDot(value, caretPos) {
    const regexp = /^(\d+)$/; ///^(\d+)[\.,]?\d?$/
    if ((regexp).test(value)) {
      value += '.00';//value.match(regexp)[1] + '.00';

      this.setState({
        value: value
      }, () => {
        this.updateCaretPosition(caretPos);
        this.debouncedSaveToRedux(value);
      });
    }
  }

  updateCaretPosition(caretPos) {
    const inputGroup = ReactDOM.findDOMNode(this);
    inputGroup.querySelector('input').setSelectionRange(caretPos, caretPos);
  }
}