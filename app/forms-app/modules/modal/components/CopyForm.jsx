import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import entities from '../../entities';
import { copy as copyForm } from '../../forms/actions';
import sessions from '../../session';
import Alert from './commons/Alert';
import FormInfo from './commons/FormInfo';
import Spinner from './commons/Spinner';

const mapStateToProps = (state, ownProps) => {
  return {
    form: entities.selectors.getEntity(state, "forms", ownProps.formId),
    creator: entities.selectors.getEntity(state, "users", ownProps.creatorId),
    userId: sessions.selectors.getUser(state),
  }
};

const mapDispatchToProps = {
  copyForm: copyForm,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CopyFormModal extends Component {
  static propTypes = {
    copyForm: PropTypes.func.isRequired,
    creator: PropTypes.object.isRequired,
    error: PropTypes.string,
    formId: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  state = {
    inputValue: this.props.form.title || '',
    error: undefined
  }

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.inputField.focus();
  }

  render() {
    return (
      <Modal show={true} backdrop='static' onHide={this.props.hideModal}>

        <Modal.Header closeButton={true}>
          <Modal.Title>
            Копирование формы
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormInfo form={this.props.form} creator={this.props.creator}/>

          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label>Введите имя для новой копии</label>
              <div className="input-group">
                <input
                  ref={(input) => { this.inputField = input; } }
                  type="text"
                  className="form-control"
                  onChange={this.changeHandler}
                  value={this.state.inputValue}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={this.clearInput}
                    title="Очистить поле"
                  >
                    <span
                      className="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    />
                  </button>
                </span>
              </div>
            </div>
            {
              this.state.error ?
              <Alert
                dismissAlert={this.dismissAlert}
                message={this.state.error}
                type="danger"
              /> :
              null
            }
          </form>

          {
            this.props.error ?
            <Alert
              message={this.props.error}
              type="danger"
            /> :
            null
          }
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.submitHandler}
          >
            { this.renderSpinner.call(this) }
            Скопировать
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

  changeHandler(e) {
    const value = e.target.value;
    this.setState({
      inputValue: value
    });
  }

  checkValidity(value) {
    if (value == "") {
      return {
        valid: false,
        error: "Поле не должно быть пустым"
      }
    }

    if (value == this.props.form.title) {
      return {
        valid: false,
        error: "Имя копии не должно совпадать с оригиналом"
      }
    }

    return {
      valid: true
    };
  }

  clearInput() {
    this.setState({
      inputValue: ''
    });

    this.inputField.focus();
  }

  dismissAlert() {
    this.setState({
      error: undefined
    });
  }

  submitHandler() {
    const value = this.state.inputValue.trim();
    const validity = this.checkValidity(value);

    if (validity.valid) {
      this.props.copyForm(
        this.props.formId,
        this.state.inputValue.trim(),
        this.props.list
      );
      return;
    }

    this.setState({
      inputValue: value,
      error: validity.error
    });

    this.inputField.focus();
  }
}