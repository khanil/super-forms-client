import React, { PropTypes } from 'react';

const EmptyList = (props) => {
  const {
    width,
    message,
  } = props;

  return (
    <tbody style={TBODY_CSS}>
      <tr>
        <td colSpan={width}>
          {message}
        </td>
      </tr>
    </tbody>
  );
}

EmptyList.propTypes = {
  width: PropTypes.number,
  message: PropTypes.any
}

EmptyList.defaultProps = {
  message: "Отсутствуют данные"
}

const TBODY_CSS = {
  textAlign: "center"
}

export default EmptyList;