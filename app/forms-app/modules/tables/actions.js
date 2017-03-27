import * as t from './actionTypes';

export function sort(table, key, type) {
  return {
    type: t.SORT,
    payload: {
      table,
      key,
      type
    }
  }
}