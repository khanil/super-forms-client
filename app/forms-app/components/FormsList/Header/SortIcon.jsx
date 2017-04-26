import React, { PropTypes } from 'react';

export default function SortIcon(props) {
  const {
    direction,
    type,
  } = props;

  const iconName = getIcon(direction, type);

  return (
    <i
      aria-hidden="true"
      className={`pull-right fa fa-sort-${iconName}`}
      style={{ paddingTop: "4px" }}
    />
  );
}

SortIcon.propTypes = {
  type: PropTypes.string,
  direction: PropTypes.oneOf(['asc', 'desc']),
}

function getIcon(direction, type = 'amount') {
  switch(type) {
    case "number" :
      return `numeric-${direction}`;
    case "string" :
      return `alpha-${direction}`;
    case "datetime" :
    default :
      return `amount-${direction}`;
  }
}