import * as t from './actionTypes';

export const initialState = {
  // user_id : [ form_id, form_id ...],
  // all: [ form_id, form_id ...],
}

export default function(state = initialState, action) {
  switch (action.type) {

    case t.ADD:
      return add(state, action.payload.relations);

    default:
      return state;
  }
}

function add(state, relations) {
  return Object.assign({}, state, relations);
}