import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import entities from '../../entities';

import Checkbox from './commons/Checkbox';

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = {
  sendForm: entities.forms.actions.send,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SendFormModal extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    sendForm: PropTypes.func.isRequired,
  };

  state = {
    allowrefill: false,
    expires: false,
  };

  constructor(props) {
    super(props);

    this.checkboxPickHandler = this.checkboxPickHandler.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  render() {
    return (
      <Modal show={true} backdrop='static' onHide={this.props.hideModal}>

        <Modal.Header closeButton={true}>
          <Modal.Title>
            Начать распространение
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="bg-info">
            <p>Для того, чтобы начать сбор ответов по данной форме, необходимо получить уникальную ссылку на страницу заполнения формы, нажав на сответствующую кнопку.</p>
            <p>После этого вы можете свободно распростонять полученную ссылку между респондентами, а также получите доступ к странице просмотра полученных ответов.</p>
            <p>Ссылка на форму, также будет отображаться в разделе "Ход мониторинга".</p>
          </div>

          <Checkbox
            checked={this.state.allowrefill}
            label="Разрешить повторное заполнение формы?"
            onClick={this.checkboxPickHandler.bind(this, "allowrefill")}
          />
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.sendForm}
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

  checkboxPickHandler(field, e) {
    const checked = e.target.checked;
    this.setState({
      [field]: checked
    });
  }

  sendForm() {
    this.props.sendForm(this.props.formId, {
      allowrefill: this.state.allowrefill,
      expires: this.state.expires,
    });
  }
}