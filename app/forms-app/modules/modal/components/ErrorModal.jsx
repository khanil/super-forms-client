import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import Alert from './commons/Alert';

function ErrorModal(props) {
  const message = (
    <div>
      <b>Не удалось выполнить операцию</b>
      <p>{props.message}</p>
    </div>
  );

  return (
    <Modal show={true} backdrop='static' onHide={props.hideModal}>

      <Modal.Body>
        <Alert
          message={message}
          type="danger"
        />
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-default"
          onClick={props.hideModal}
        >
          Закрыть
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ErrorModal.propTypes = {
  hideModal: PropTypes.func,
  message: PropTypes.string.isRequired,
}

export default ErrorModal;