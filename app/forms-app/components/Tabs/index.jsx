import React, { Component, PropTypes } from 'react';

export default class Tabs extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    )
  }

  constructor(props) {
    super(props);
  }

  renderTabs() {
    const {
      active,
      clickHandler,
      tabs
    } = this.props;

    return tabs.map((tab) => {
      return (
        <li
          className={active === tab.key ? 'active' : ''}
          key={tab.key}
          role="presentation"
          onClick={clickHandler.bind(null, tab.key)}
        >
          <a href="#">{tab.label}</a>
        </li>
      );
    });
  }

  render() {
    return (
      <ul
        className="nav nav-pills"
        style={
          {
            margin: "auto",
            marginBottom: "15px",
            width: "242px",
          }
        }
      >
        {this.renderTabs()}
      </ul>
    );
  }
}