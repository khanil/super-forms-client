import React, { PropTypes } from 'react';

import Column from './Column';

export default function Questions(props) {
  const questions = props.questions;

  return (
    <tr>
      <Column
        key={'#'}
        content="#"
      />
      <Column
        key={'date'}
        content="Дата"
      />
      {
        questions.map((q, i) => (
          <Column 
            key={i}
            content={q.title}
            tip={q.description}
          />
        ))
      }
    </tr>
  );
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired
}