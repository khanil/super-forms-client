import * as t from './actionTypes';

export function filter(tableID, filter) {
  return {
    type: t.FILTER,
    payload: {
      tableID,
      filter
    }
  }
}

export function reset(tableID) {
  return {
    type: t.RESET,
    payload: {
      tableID
    }
  };
}

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