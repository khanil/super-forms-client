import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
Moment.locale('ru');

const formatTime = 'HH:mm:ss';

export default function FetchResponses(props) {
  const fetchedLast = Moment(props.fetchedLast).format(formatTime);

  return (
    <div className="pull-right">
      <span>
        {`Последнее обновление в ${fetchedLast}`}
      </span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.fetchResponses}
      >
        Обновить
      </button>
    </div>
  );
}

FetchResponses.propTypes = {
  fetchedLast: PropTypes.number.isRequired,
  fetchResponses: PropTypes.func.isRequired
}