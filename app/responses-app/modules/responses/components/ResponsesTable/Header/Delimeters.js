import React, { PropTypes } from 'react';

import Column from './Column';

export default function Delimeters(props) {
  const delimeters = props.delimeters;

  if (!delimeters.length) {
    return null;
  }

  return (
    <tr>
      <Column
        content=""
        width={2}
      />
      {
        delimeters.map((d, i) => (
          <Column
            key={i}
            content={d.title}
            width={d.width}
          />
        ))
      }
    </tr>
  );
}

Delimeters.propTypes = {
  delimeters: PropTypes.array.isRequired
}