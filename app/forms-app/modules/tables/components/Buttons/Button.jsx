import React, { PropTypes } from 'react';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string
};

export default function Button(props) {
  const {
    children,
    onClick,
    title
  } = props;
  
  return (
    <button
       className="btn btn-default"
       onClick={onClick}
       title={title}
    >
      {children}
    </button>
  );
}