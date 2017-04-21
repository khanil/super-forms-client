import React, { Component, PropTypes } from 'react';
import debounce from 'throttle-debounce/debounce';

export default class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func,
  }

  state = {
    inputValue: this.props.defaultValue || '',
  }

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.searchHandler = debounce(300, this.props.onSearch);
  }

  componentWillUnmount() {
    this.props.onClear();
  }

  render() {
    return (
      <div className="form-group">

        <label>Поиск по пользователю</label>

        <div className="input-group">

          <input
            ref={(input) => { this.inputField = input; } }
            type="text"
            className="form-control"
            onChange={this.changeHandler}
            value={this.state.inputValue}
          />

          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="button"
              onClick={this.clearInput}
              title="Очистить поле"
            >
              <span
                className="glyphicon glyphicon-remove"
                aria-hidden="true"
              />
            </button>
          </span>

        </div>
      </div>
    );
  }

  changeHandler(e) {
    const value = e.target.value;
    this.setState({
      inputValue: value
    });
    this.searchHandler(value.trim());
  }

  clearInput() {
    const emptyValue = '';

    if (this.state.inputValue == emptyValue)
      return;

    this.setState({
      inputValue: emptyValue
    });

    if (this.props.onClear) {
      this.props.onClear();
    } else {
      this.props.onSearch(emptyValue);
    }
    // this.searchHandler(emptyValue);
  }
}