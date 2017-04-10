import * as t from './actionTypes';
import * as model from './model';

export const initialState = {
  entities: {},
  errors: {},
  fetchStatus: {},
}

export default function(state = initialState, action) {
  switch (action.type) {

    case t.ADD:
      return add(state, action.payload.forms);

    default:
      return state;
  }
}