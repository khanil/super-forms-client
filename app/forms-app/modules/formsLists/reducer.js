import * as t from './actionTypes';

const initialFormsListState = {
  entries: [],
  sortKey: "index",
  direction: "desc",
}

export const initialState = {
  "org": initialFormsListState,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.FETCH_SUCCESS:
      return addFetchedList(state, action);

    case t.SORT:
      return setSort(state, action.meta);

    default:
      return state;
  }
}

function addFetchedList(state, { meta, payload }) {
  const { list } = meta;
  const { entries } = payload;

  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      entries
    })
  });
}

function setSort(state, { list, sortKey, direction }) {
  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      sortKey,
      direction,
    })
  });
}