import React, { PropTypes } from 'react';

import Button from './Button';

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string
};

export default function ButtonIcon(props) {
  const {
    icon,
    onClick,
    title
  } = props;
  
  return (
    <Button
      onClick={onClick}
      title={title}
    >
      <span
        className={`glyphicon glyphicon-${icon}`}
        aria-hidden="true"
      />
    </Button>
  );
}