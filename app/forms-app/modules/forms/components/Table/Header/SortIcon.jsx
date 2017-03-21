import React, { PropTypes } from 'react';

export default function SortIcon(props) {
  const {
    dir,
    type,
  } = props.config;

  const iconName = getIcon(dir, type);

  return (
    <i
      aria-hidden="true"
      className={`pull-right fa fa-sort-${iconName}`}
      style={{ paddingTop: "3px" }}
    />
  );
}

SortIcon.propTypes = {
  config: PropTypes.shape({
    type: PropTypes.string,
    dir: PropTypes.oneOf(['asc', 'desc']),
  }),
}

function getIcon(dir, type = 'amount') {
  switch(type) {
    case "number" :
      return `numeric-${dir}`;
    case "string" :
      return `alpha-${dir}`;
    case "datetime" :
    default :
      return `amount-${dir}`;
  }
}