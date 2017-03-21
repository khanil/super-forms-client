import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Panel } from 'react-bootstrap';
// import { connect } from 'react-redux';
import Moment from 'moment';
Moment.locale('ru');

const format = 'DD/MM/YY HH:mm:ss';

import { InputParagraph } from '../Forms/inputs';
import FormsList from '../../utils/formsList';
import { getDB, remove } from '../../redux/modules/formsList';

class ModalBlockForm extends Component {
  static propTypes = {
    blockForm: PropTypes.func.isRequired,
    formId: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  state = {
    reason: ''
  }

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  render() {
    return (
      <Modal show={true} backdrop='static'>

        <Modal.Header>
          <Modal.Title>
            Блокировка формы
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <dl className="dl-horizontal bg-info">
            <dt>Номер:</dt>
            <dd>{this.props.form.index}</dd>
            <dt>Форма:</dt>
            <dd>{this.props.form.title}</dd>
            <dt>Создана:</dt>
            <dd>{Moment(this.props.form.created).format(format)}</dd>
            <dt>Отправлена:</dt>
            <dd>
              {Moment(this.props.form.sent).format(format)}
              <span className="badge">
                {this.props.form.resp_count + " отв."} 
              </span>
            </dd>
            <dt>Автор:</dt>
            <dd>{this.props.form.author}</dd>
          </dl>

          {/*<Panel
            collapsible
            header="История операций:"
          >
            <dl className="dl-horizontal">
              <dt>Дата:</dt>
              <dd></dd>
              <dt>Ответственное лицо:</dt>
              <dd></dd>
              <dt>Операция:</dt>
              <dd></dd>
              <dt>Комментарий:</dt>
              <dd></dd>
            </dl>

            <hr/>

            <dl className="dl-horizontal">
              <dt>Дата:</dt>
              <dd></dd>
              <dt>Ответственное лицо:</dt>
              <dd></dd>
              <dt>Операция:</dt>
              <dd></dd>
              <dt>Комментарий:</dt>
              <dd></dd>
            </dl>
          </Panel>*/}

          <label>Причина блокировки</label>
          <textarea
            type="text"
            rows='5'
            className="form-control"
            onChange={this.changeHandler}
            placeholder='Причина блокировки'
            value={this.state.reason}
          />

        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.hideModal}
          >
            Отмена
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.submitHandler}
          >
            Заблокировать
          </button>
        </Modal.Footer>

      </Modal>
    );
  }

  changeHandler(e) {
    const value = e.target.value;
    this.setState({
      reason: value
    });
  }

  submitHandler() {
    this.props.blockForm(this.props.formId);
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log(ownProps);

//   return {
//     form: FormsList.getForm( getDB(state.app.formsList), ownProps.formId )
//   };
// };

// const mapDispatchToProps = {
//   blockForm: remove
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ModalBlockForm);
export default ModalBlockForm;