import React, { PropTypes } from 'react';

const Alert = props => {
  return (
    <div
      className={`alert alert-${props.type}`}
      role="alert"
    >
      {
        props.dismissAlert ?
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={props.dismissAlert}
        >
          <span aria-hidden="true">&times;</span>
        </button> :
        null
      }
      
      {props.message}
    </div>
  );
};

Alert.propTypes = {
  dismissAlert: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: "info"
}

export default Alert;