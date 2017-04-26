import React, { PropTypes } from 'react';
import SortIcon from './SortIcon';

const Column = (props) => {
  const {
    sortKey,
    onClick,
    sorted,
    sort,
    children
  } = props;

  return (
    <th
      onClick={onClick.bind(null, sortKey)}
    >
      {
        sorted &&
          <SortIcon
            {...sort}
          />
      }

      {children}
    </th>
  );
}

Column.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sorted: PropTypes.bool.isRequired,
  sort: PropTypes.object
}

export default Column;