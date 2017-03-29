import React, { PropTypes } from 'react';

import ButtonIcon from './Buttons/ButtonIcon';

ControlsOrg.propTypes = {
  copyForm: PropTypes.func.isRequired,
  showResponses: PropTypes.func.isRequired
};

export default function ControlsOrg(props) {
  return (
    <div className='btn-group'>
      <ButtonIcon
        icon='duplicate'
        onClick={props.copyForm}
        title='Копировать'
      />
      <ButtonIcon
        icon='list-alt'
        onClick={props.showResponses}
        title='Перейти к ответам'
      />
    </div>
  );
}