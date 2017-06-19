import React, { PropTypes } from 'react';

export default function FetchXLSX(props) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-default"
        onClick={props.fetchXLSX}
      >
        Выгрузить в XLSX
      </button>
    </div>
  );
}

FetchXLSX.propTypes = {
  fetchXLSX: PropTypes.func.isRequired
}