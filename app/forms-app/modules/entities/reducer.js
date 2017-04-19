import { combineReducers } from 'redux';

import * as t from './actionTypes';
import * as model from './model';
import { forms, users } from './modules';

// export default combineReducers(reducers);
export default function(state = {}, action) {
  switch (action.type) {

    case t.ADD:
      return model.add(state, action);

    default:
      return {
        forms: forms.reducer(state.forms, action),
        users: users.reducer(state.users, action),
      }
  }
}