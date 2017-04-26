import React, { PropTypes } from 'react';
import SortIcon from './SortIcon';

const SortedColumn = (props) => {
  return (
    <th
      onClick={onClick.bind(null, sortKey)}
    >
      {
        sorted ?
        <SortIcon
          config={{order: direction}}
        /> :
        null
      }

      {children}
    </th>
  );
}

SortedColumn.propTypes = {
  sort: PropTypes.Object,
  sortKey: PropTypes.string,
  onClick: PropTypes.func,
}

export default SortedColumn;