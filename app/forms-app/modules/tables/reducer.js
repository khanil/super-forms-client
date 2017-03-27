import * as t from './actionTypes';
import { ORDER_ASC, ORDER_DESC } from './constants';
import { getSort } from './selectors';
import { index as defaultSortCol } from './utils/columns';

const initialSort = {
  key: defaultSortCol.key,
  type: defaultSortCol.compareType,
  order: ORDER_DESC,
};

const tableInitialState = {
  sort: initialSort,
};

export const initialState = {
  org: tableInitialState,
  personal: tableInitialState,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SORT:
      return applySort(state, action);

    default:
      return state;
  }
}

function applySort(state, action) {
  const {
    table,
    key,
    type
  } = action.payload;

  const cur = state[table].sort;

  const isKeyChanged = (key !== cur.key);

  return Object.assign({}, state, {
    [table]: Object.assign({}, state[table], {
      sort: Object.assign({}, state[table].sort,
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