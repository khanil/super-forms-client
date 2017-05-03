import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import Alert from './commons/Alert';

function Success(props) {
  return (
    <Modal show={true} backdrop='static' onHide={props.hideModal}>

      {/*<Modal.Header closeButton={true}>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>*/}

      <Modal.Body>
        <Alert
          message={props.text}
          type="success"
        />
      </Modal.Body>

      {/*<Modal.Footer>
        <button
          type="button"
          className="btn btn-default"
          onClick={props.hideModal}
        >
          Закрыть
        </button>
      </Modal.Footer>*/}
    </Modal>
  );
}

Success.propTypes = {
  hideModal: PropTypes.func,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Success;