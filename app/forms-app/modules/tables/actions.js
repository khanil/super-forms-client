import * as t from './actionTypes';

export function sort(tableID, key, type) {
  return {
    type: t.SORT,
    payload: {
      tableID,
      key,
      type
    }
  }
}

export function filter(tableID, filter) {
  return {
    type: t.FILTER,
    payload: {
      tableID,
      filter
    }
  }
}