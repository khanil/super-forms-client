import React, { PropTypes } from 'react';

import Column from './Column';

export default function Row(props) {
  const {
    order,
    received,
    responses,
    questions
  } = props;

  return (
    <tr>
      <Column
        content={order}
      />
      <Column
        content={received}
        type={'datetime'}
      />
      {
        responses.map((r, i) => (
          <Column
            key={i}
            content={r}
            type={questions[i].type}
          />
        ))
      }
    </tr>
  );
}

Row.propTypes = {
  order: PropTypes.number.isRequired,
  responses: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired
}