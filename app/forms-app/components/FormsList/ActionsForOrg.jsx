import React, { Component, PropTypes } from 'react';

import { ControlsOrg, ControlsPersonal } from '../FormsTable/Controls';
import IButton from './Buttons/ButtonIcon';

export default class ActionsForOrg extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const formId = this.props.data.id;
    const payload = { formId };
    const showModal = this.props.showModal;

    return (
      <td style={TD_CSS}>
        <div className='btn-group'>
          <IButton
            icon='duplicate'
            onClick={showModal.bind(null, "CopyForm", payload)}
            title='Копировать'
          />
          <IButton
            icon='list-alt'
            onClick={this.redirect.bind(null, `/forms/${formId}/responses`)}
            title='Перейти к ответам'
          />
        </div>
      </td>
    );
  }

  redirect(uri) {
    document.location.pathname = uri;
  }
}

const TD_CSS = {
  width: "96px"
};