import React, { PropTypes } from 'react';

import ButtonIcon from '../Buttons/ButtonIcon';

ControlsPersonal.propTypes = {
  copyForm: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  isFormSent: PropTypes.bool.isRequired,
  removeForm: PropTypes.func.isRequired,
  sendForm: PropTypes.func.isRequired,
  showLink: PropTypes.func.isRequired,
  showResponses: PropTypes.func.isRequired
};

ControlsPersonal.defaultProps = {
  isFormSent: false
}

export default function ControlsPersonal(props) {
  return (
    <div className='btn-group'>
      {
        (function(){
          if (props.isFormSent) {
            return (
              <div className='btn-group'>
                <ButtonIcon
                  icon='link'
                  onClick={props.showLink}
                  title='Показать ссылку'
                />
                <ButtonIcon
                  icon='list-alt'
                  onClick={props.showResponses}
                  title='Перейти к ответам'
                />
              </div>
            );
          } else {
            return (
              <div className='btn-group'>
                <ButtonIcon
                  icon='send'
                  onClick={props.sendForm}
                  title='Отправить'
                />
                <ButtonIcon
                  icon='pencil'
                  onClick={props.editForm}
                  title='Редактировать'
                />
              </div>
            );
          }
        }())
      }
      <ButtonIcon
        icon='duplicate'
        onClick={props.copyForm}
        title='Копировать'
      />
      <ButtonIcon
        icon='trash'
        onClick={props.removeForm}
        title='Удалить'
      />
    </div>
  );
}