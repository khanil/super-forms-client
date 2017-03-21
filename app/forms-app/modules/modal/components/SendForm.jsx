import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import forms from '../../forms';

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = {
  sendForm: forms.actions.send,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SendFormModal extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    sendForm: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal show={true} backdrop='static' onHide={this.props.hideModal}>

        <Modal.Header closeButton={true}>
          <Modal.Title>
            Начать распространение
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="bg-info">
            <p>Для того, чтобы начать сбор ответов по данной форме, необходимо получить уникальную ссылку на страницу заполнения формы, нажав на сответствующую кнопку.</p>
            <p>После этого вы можете свободно распростонять полученную ссылку между респондентами, а также получите доступ к странице просмотра полученных ответов.</p>
            <p>Ссылка на форму, также будет отображаться в разделе "Ход мониторинга".</p>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.sendForm.bind(null, this.props.formId)}
          >
            Получить ссылку
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