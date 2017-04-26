import React, { Component, PropTypes } from 'react';

import FormAttribute from './FormAttribute';

export default class Form extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      data,
      columns
    } = this.props;

    return (
      <tr>
        {
          columns.map(({ key }) => (
            <FormAttribute
              key={`${id}-${key}`}
              attribute={key}
              data={data}
            />
          ))
        }
      </tr>
    );
  }
}