import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Body from './Body';

export default class ResponsesTable extends Component {
  
  static propTypes = {
    responses: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      responses,
      items
    } = this.props;

    return (
      <div className='table-responsive'>
        <table className="table table-bordered table-hover table-responses">
          <Header items={items}/>
          <Body responses={responses} items={items}/>
        </table>
      </div>
    );
  }
}
