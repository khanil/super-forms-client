import React, { PropTypes } from 'react';
import Moment from 'moment';

Moment.locale('ru');
const format = 'DD/MM/YY HH:mm:ss';

const FormInfo = props => {
  return (
    <dl className="dl-horizontal bg-info">
      <dt>Номер:</dt>
      <dd>{props.form.index}</dd>
      <dt>Форма:</dt>
      <dd>{props.form.title}</dd>
      <dt>Создана:</dt>
      <dd>{Moment(props.form.created).format(format)}</dd>
      <dt>Отправлена:</dt>
      <dd>
        {Moment(props.form.sent).format(format)}
        <span className="badge">
          {props.form.resp_count + " отв."}
        </span>
      </dd>
      <dt>Автор:</dt>
      <dd>{props.creator.author}</dd>
    </dl>
  );
};

FormInfo.propTypes = {
  form: PropTypes.object.isRequired,
  creator: PropTypes.object.isRequired,
};

export default FormInfo;