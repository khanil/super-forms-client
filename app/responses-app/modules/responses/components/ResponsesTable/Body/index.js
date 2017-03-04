import React, { Component, PropTypes } from 'react';

import Row from './Row';

export default class Body extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    responses: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      responses
    } = this.props;

    const questions = this.getQuestions(items);
    const respAmount = responses.length;

    return (
      <tbody>
        {
          responses.map((r,i) => (
            <Row
              key={r.id}
              order={respAmount - i}
              received={r.received}
              responses={r.list}
              questions={questions}
            />
          ))
        }
      </tbody>
    );
  }

  getQuestions(items) {
    return items.filter((i) => i._type === 'question');
  }
}