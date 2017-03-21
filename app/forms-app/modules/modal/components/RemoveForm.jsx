import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import forms from '../../forms';

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = {
  removeForm: forms.actions.remove,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RemoveFormModal extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    removeForm: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal show={true} backdrop='static' onHide={this.props.hideModal}>

        <Modal.Header closeButton={true}>
          <Modal.Title>
            Удаление формы
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="alert alert-danger">
            <h4><strong>Внимание!</strong></h4>
            <p>Нажав на кнопку «Удалить», вы <strong>безвозвратно потеряете все ответы и отчеты</strong>, связанные с данной формой.</p>
            <p>Производите удаление, только когда уверены в своих действиях.</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.removeForm.bind(null, this.props.formId)}
          >
            Удалить
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.hideModal}
          >
            Отмена
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}