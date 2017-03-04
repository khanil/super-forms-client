import React, { Component, PropTypes } from 'react';

import Delimeters from './Delimeters';
import Questions from './Questions';

export default class Header extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      delimeters,
      questions
    } = this.structureItems(this.props.items);

    return (
      <thead>
        <Delimeters delimeters={delimeters} />
        <Questions questions={questions} />
      </thead>
    );
  }

  structureItems(items) {
    const initialDelimeter = {content: ''};

    const result = items.reduce((sItems, item, i) => {
      const {
        dels,
        qs
      } = sItems;

      switch(item._type) {
        case 'delimeter':
          if (qs.length == 0) {
            sItems.del = item;
            return sItems;
          }
          sItems.del.width = qs.length - sItems.lastQ;
          dels.push(sItems.del);
          sItems.lastQ = qs.length;
          sItems.del = item;
          return sItems;
        case 'question':
          qs.push(item);
          return sItems;
        default:
          return sItems;
      }
    }, { qs: [], dels: [], lastQ: 0, del: initialDelimeter });

    if (result.del !== initialDelimeter) {
      result.del.width = result.qs.length - result.lastQ;
      result.dels.push(result.del);
    }

    return {
      delimeters: result.dels,
      questions: result.qs
    };
  }
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};