import * as t from './actionTypes';

const initialFormsListState = {
  entities: ["forms", "users"],
  keyEntity: "forms",
  entries: [],
  sortKey: "forms.index",
  direction: "desc",
  loading: true
}

export const initialState = {
  "org": initialFormsListState,
  "personal": initialFormsListState
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.FETCH_REQUEST:
      return setLoading(state, action.meta, true);

    case t.FETCH_SUCCESS:
      return addFetchedList(state, action);

    case t.SORT:
      return setSort(state, action.meta);

    case t.INJECT:
      return inject(state, action.meta);

    default:
      return state;
  }
}

function addFetchedList(state, { meta, payload }) {
  const { list } = meta;
  const { entries } = payload;

  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      entries,
      loading: false
    })
  });
}

function setLoading(state, { list }, status) {
  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      loading: status
    })
  })
}

function setSort(state, { list, sortKey, direction }) {
  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      sortKey,
      direction,
    })
  });
}

function inject(state, { list, id, index }) {
  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      entries: [
        id,
        ...state[list].entries
      ]
    })
  });
}