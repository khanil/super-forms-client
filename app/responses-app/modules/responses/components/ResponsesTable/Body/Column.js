import React, { PropTypes } from 'react';
import Moment from 'moment';
Moment.locale('ru');

const formatDate = 'DD/MM/YY';
const formatTime = 'HH:mm:ss';

export default function Column(props) {
  const {
    content,
    type
  } = props;

  return (
    <td>
      {
        (function(){
          switch(type.toUpperCase()) {
            case 'DATE':
              return Moment(content).format(formatDate);
            case 'TIME' :
              return Moment(content).format(formatTime);
            case 'DATETIME' :
              return Moment(content).format(formatDate + ' ' + formatTime);
            case 'SELECT':
              /** For previous releases */
              if (typeof(content) === 'string')
                break;
              return content.join('; ');
            default:
              return content;
          }
        })()
      }
    </td>
  );
}

Column.propTypes = {
  content: PropTypes.any.isRequired,
  type: PropTypes.string
}

Column.defaultProps = {
  type: 'string'
}