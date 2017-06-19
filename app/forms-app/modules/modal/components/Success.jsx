import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import Alert from './commons/Alert';

function Success(props) {
  return (
    <Modal show={true} backdrop='static' onHide={props.hideModal}>
      <Modal.Body>
        <Alert
          message={props.text}
          type="success"
        />
      </Modal.Body>
    </Modal>
  );
}

Success.propTypes = {
  hideModal: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Success;