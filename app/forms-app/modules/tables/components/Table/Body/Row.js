import React, { Component, PropTypes } from 'react';

export default class Row extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  render() {
    const {
      onClick
    } = this.props;

    return (
      <tr
        ref={(tr) => { this._element = tr }}
        onClick={onClick ? this.clickHandler : null}
      >
        {this.props.children}
      </tr>
    );
  }

  clickHandler(event) {
    const lastTD = this._element.lastElementChild;
    let target = event.target;

    while (target !== this._element) {
      if (target == lastTD) {
        return;
      }
      target = target.parentNode;
    }

    this.props.onClick();
  }
}