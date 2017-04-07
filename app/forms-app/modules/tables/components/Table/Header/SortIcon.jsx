import React, { PropTypes } from 'react';

export default function SortIcon(props) {
  const {
    order,
    type,
  } = props.config;

  const iconName = getIcon(order, type);

  return (
    <i
      aria-hidden="true"
      className={`pull-right fa fa-sort-${iconName}`}
      style={{ paddingTop: "4px" }}
    />
  );
}

SortIcon.propTypes = {
  config: PropTypes.shape({
    type: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']),
  }),
}

function getIcon(order, type = 'amount') {
  switch(type) {
    case "number" :
      return `numeric-${order}`;
    case "string" :
      return `alpha-${order}`;
    case "datetime" :
    default :
      return `amount-${order}`;
  }
}