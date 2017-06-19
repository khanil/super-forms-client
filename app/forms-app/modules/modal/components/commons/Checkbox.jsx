import React, { Component, PropTypes } from 'react';

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          value={props.checked}
          onChange={props.onClick}
        />
        {props.label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false
};
