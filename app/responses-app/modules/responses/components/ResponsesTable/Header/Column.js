import React, { PropTypes } from 'react';

export default function Column(props) {
  const {
    content,
    tip,
    width
  } = props;

  return (
    <th
      className={tip ? "th_tipped" : null}
      colSpan={width}
      title={tip}
    >
      {content}
    </th>
  );
}

Column.propTypes = {
  content: PropTypes.string.isRequired,
  tip: PropTypes.string,
  width: PropTypes.number
}