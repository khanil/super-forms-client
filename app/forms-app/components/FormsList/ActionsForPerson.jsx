import React, { Component, PropTypes } from 'react';

import { ControlsOrg, ControlsPersonal } from '../FormsTable/Controls';
import IButton from './Buttons/ButtonIcon';

export default class ActionsForPerson extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.renderCommon = this.renderCommon.bind(this);
    this.renderWhenSent = this.renderWhenSent.bind(this);
    this.renderWhenNotSent = this.renderWhenNotSent.bind(this);
  }

  render() {
    this.formId = this.props.data.id;

    return (
      <td>
        <div className='btn-group'>
          {
            this.props.data.sent ?
            this.renderWhenSent() :
            this.renderWhenNotSent()
          }
          { this.renderCommon() }
        </div>
      </td>
    );
  }

  renderCommon() {
    const showModal = this.props.showModal;
    const payload = { formId: this.formId };

    return (
      <div className='btn-group'>
        <IButton
          icon='duplicate'
          onClick={showModal.bind(null, "CopyForm", payload)}
          title='Копировать'
        />
        <IButton
          icon='trash'
          onClick={showModal.bind(null, "RemoveForm", payload)}
          title='Удалить'
        />
      </div>
    );
  }

  renderWhenSent() {
    const showModal = this.props.showModal;
    const payload = { formId: this.formId };

    return (
      <div className='btn-group'>
        <IButton
          icon='link'
          onClick={showModal.bind(null, "ViewLink", payload)}
          title='Показать ссылку'
        />
        <IButton
          icon='list-alt'
          onClick={this.redirect.bind(null, `/forms/${this.formId}/responses`)}
          title='Перейти к ответам'
        />
      </div>
    );
  }

  renderWhenNotSent() {
    const showModal = this.props.showModal;
    const payload = { formId: this.formId };

    return (
      <div className='btn-group'>
        <IButton
          icon='send'
          onClick={showModal.bind(null, "SendForm", payload)}
          title='Отправить'
        />
        <IButton
          icon='pencil'
          onClick={this.redirect.bind(null, `/forms/${this.formId}/edit`)}
          title='Редактировать'
        />
      </div>
    );
  }

  redirect(uri) {
    document.location.pathname = uri;
  }
}