import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import entities from '../../entities';
import Checkbox from './commons/Checkbox';
import Spinner from './commons/Spinner';
import Alert from './commons/Alert';

import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

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
    allowexpire: false,
    expires: null,
    error: undefined
  };

  constructor(props) {
    super(props);

    this.checkboxPickHandler = this.checkboxPickHandler.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.renderDatetimePicker = this.renderDatetimePicker.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
    this.renderError = this.renderError.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
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

          <form onSubmit={this.submitHandler}>
            <Checkbox
              checked={this.state.allowrefill}
              label="Разрешить повторное заполнение формы?"
              onClick={this.checkboxPickHandler.bind(this, "allowrefill")}
            />

            <Checkbox
              checked={this.state.allowexpire}
              label="Ограничить срок приема ответов?"
              onClick={this.checkboxPickHandler.bind(this, "allowexpire")}
            />

            { this.renderDatetimePicker() }
            { this.renderError() }
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.submitHandler}
          >
            { this.renderSpinner.call(this) }
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

  renderSpinner() {
    if (this.props.busy !== true)
      return null;

    return (
      <Spinner />
    );
  }

  renderDatetimePicker() {
    const { allowexpire, expires } = this.state;

    if (allowexpire == false)
      return null;

    return (
      <div className="form-group">
        <DateTimePicker
          format={`${dateFormat} ${timeFormat}`}
          onChange={this.pickDate}
          value={ expires ? Moment(expires).clone().toDate() : null }
        />
      </div>
    );
  }

  renderError() {
    const error = this.state.error;

    if (!error)
      return null;

    return (
      <Alert
        dismissAlert={this.dismissAlert}
        message={error}
        type="danger"
      />
    );
  }

  checkboxPickHandler(field, e) {
    const checked = e.target.checked;

    if (field == "allowexpire" && checked == false) {
      this.setState({
        allowexpire: false,
        expires: null,
        error: null
      });
      return;
    }

    this.setState({
      [field]: checked
    });
  }

  checkValidity() {
    const state = this.state;

    if (state.allowexpire) {
      if (!state.expires) {
        return {
          valid: false,
          error: "Поле не должно быть пустым"
        }
      }

      if (state.expires - Date.now() < 0/*3600000*/) {
        return {
          valid: false,
          error: "Длительность приема ответов должна быть больше 1 часа"
        }
      }
    }

    return {
      valid: true
    };
  }

  pickDate(date, datestring) {
    this.setState({
      expires: date
    });
  }

  dismissAlert() {
    this.setState({
      error: undefined
    });
  }

  submitHandler() {
    const validity = this.checkValidity();

    if (validity.valid) {
      const { allowrefill, expires } = this.state;

      this.props.sendForm(this.props.formId, {
        allowrefill,
        expires: expires ? Moment(expires).format() : expires,
      });

      return;
    }

    this.setState({
      error: validity.error
    });
  }
}