import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Alert from './commons/Alert';

const CLIPBOARD = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  NONE: 'none'
}

const successCopy = {
  type: "success",
  message: "Ссылка скопирована в буффер обмена"
}

const failureCopy = {
  type: "warning",
  message: "К сожалению ваш браузер не поддерживает данную функцию. Пожалуйста, скопируйте ссылку вручную."
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = {
};

// @connect(mapStateToProps, mapDispatchToProps)
export default class RemoveFormModal extends Component {
  static propTypes = {
    formId: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  state = {
    copiedToClipboard: CLIPBOARD.NONE
  }

  componentDidMount() {
    this.inputField.select();
  }

  constructor(props) {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.link = `${window.location.host}/forms/${this.props.formId}`;
  }

  render() {
    const alertProps = this.getAlertProps();

    return (
      <Modal show={true} backdrop='static' onHide={this.props.hideModal}>

        <Modal.Header closeButton={true}>
          <Modal.Title>
            Ссылка на форму
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <label>Ссылка на форму</label>
            <div className={this.state.copiedToClipboard == CLIPBOARD.FAILURE ? null : "input-group"}>
              <input
                ref={(input) => { this.inputField = input; } }
                type="text"
                className="form-control"
                value={this.link}
                readOnly
              />

              {
                this.state.copiedToClipboard == CLIPBOARD.FAILURE ?
                null :
                <span className="input-group-btn">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.copyToClipboard}
                    title="Скопировать ссылку"
                  >
                    Скопировать
                  </button>
                </span>
              }
            </div>
          </div>

          {
            this.state.copiedToClipboard == CLIPBOARD.NONE ?
            null :
            <Alert
              {...alertProps}
            />
          }
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.hideModal}
          >
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  copyToClipboard() {
    this.inputField.select();

    try {
      const successful = document.execCommand('copy');
      this.setState({
        copiedToClipboard: CLIPBOARD.SUCCESS
      });
    } catch (err) {
      this.setState({
        copiedToClipboard: CLIPBOARD.FAILURE
      });
    }
  }

  getAlertProps() {
    const copyStatus = this.state.copiedToClipboard;

    if (copyStatus == CLIPBOARD.NONE) {
      return null;
    }

    return Object.assign(
      {
        dismissAlert: this.dismissAlert
      },
      copyStatus == CLIPBOARD.SUCCESS ?
        successCopy:
        failureCopy
    );
  }
}