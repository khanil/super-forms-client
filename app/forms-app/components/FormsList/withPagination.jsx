import React, { Component, PropTypes } from 'react';

import Pagination from './Pagination';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName ||
         WrappedComponent.name ||
         'Component';
}

export default function withPagination(WrappedComponent) {

  class PaginationEnchaser extends Component {
    static displayName = `withPagination(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      entries: PropTypes.array.isRequired,
    }

    state = {
      currentPage: 0,
      displayEntries: 10
    }

    constructor(props) {
      super(props);

      this.currentPageChangeHandler = this.currentPageChangeHandler.bind(this);
    }

    render() {
      const {
        entries
      } = this.props;
      const {
        currentPage,
        displayEntries
      } = this.state;

      const entriesToDisplay = entries.slice(
        currentPage * displayEntries,
        (currentPage + 1) * displayEntries
      );

      return (
        <div>
          <WrappedComponent
            {...this.props}
            entries={entriesToDisplay}
          />

          <Pagination
            current={currentPage}
            pages={Math.ceil(entries.length / displayEntries)}
            onClick={this.currentPageChangeHandler}
          />
        </div>
      );
    }

    currentPageChangeHandler(next) {
      this.setState({
        currentPage: next
      });
    }
  }

  return PaginationEnchaser;
}