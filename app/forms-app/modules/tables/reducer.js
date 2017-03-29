import * as t from './actionTypes';
import { ORDER_ASC, ORDER_DESC } from './constants';
import { getSort } from './selectors';

export const initialState = {

};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SORT:
      return applySort(state, action);

    case t.FILTER:
      return applyFilter(state, action);

    default:
      return state;
  }
}

function applySort(state, action) {
  const {
    tableID,
    key,
    type
  } = action.payload;

  let table = state[tableID];

  const cur = table.sort;
  const isKeyChanged = (key !== cur.key);

  return Object.assign({}, state, {
    [tableID]: Object.assign({}, table, {
      sort: Object.assign({}, table.sort,
        isKeyChanged ?
          {
            key,
            type,
            order: ORDER_DESC
          } :
          {
            order: cur.order == ORDER_DESC ? ORDER_ASC : ORDER_DESC
          }
      )
    })
  });
}

function applyFilter(state, action) {
  const {
    tableID,
    filter
  } = action.payload;

  let table = state[tableID];

  return Object.assign({}, state, {
    [tableID]: Object.assign({}, table, {
      filter: filter
    })
  });
}