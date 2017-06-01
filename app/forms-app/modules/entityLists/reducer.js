import * as t from './actionTypes';

const initialState = {};

export default function create(initialState = initialState) {
  return function(state = initialState, action) {
    switch (action.type) {

      case t.ADD:
        return addList(state, action);

      case t.REMOVE:
        return removeList(state, action);

      case t.SORT:
        return setSort(state, action);

      case t.INIT_ENTRIES:
        return initEntries(state, action);

      case t.ADD_ENTRIES:
        return addEntries(state, action);

      case t.REMOVE_ENTRIES:
        return removeEntries(state, action);

      default:
        return state;
    }
  }
}

function addList(state, action) {
  return Object.assign({}, state, {
    [action.list]: action.config
  });
}

function removeList(state, action) {
  const list = action.payload.list;
  if (state[list] == undefined)
    return state;

  const stateCopy = Object.assign({}, state);
  delete stateCopy[action.list];
  return stateCopy;
}

function setSort(state, action) {
  const {
    list,
    sortKey,
    direction
  } = action.payload;

  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      sortKey,
      direction,
    })
  });
}

function initEntries(state, action) {
  let {
    list,
    entries
  } = action.payload;

  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      entries
    })
  });
}

function addEntries(state, action) {
  let {
    list,
    entries
  } = action.payload;

  if (!Array.isArray(entries))
    entries = [entries];

  return Object.assign({}, state, {
    [list]: Object.assign({}, state[list], {
      entries: [
        ...entries,
        ...state[list].entries
      ]
    })
  });
}

function removeEntries(state, action) {
  const {
    list,
    entries
  } = action.payload;

  return state;
}