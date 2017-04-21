import * as t from './actionTypes';

const emptyQuery = "";

export const initialState = {
  query: emptyQuery,
  result: null,
}

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SET_QUERY:
      return setQuery(state, action.payload.query);

    case t.CLEAR:
      return initialState;

    case t.FETCH_SUCCESS:
      return setResult(state, action);

    default:
      return state;
  }
}

function setQuery(state, query) {
  return Object.assign({}, state, {
    query
  });
}

function setResult(state, action) {
  const result = action.payload.result;
  return Object.assign({}, state, {
    result
  })
}