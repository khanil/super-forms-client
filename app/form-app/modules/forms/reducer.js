import * as t from './actionTypes';
import { NAME as FORM, reducer as formReducer } from './form/constants';

const initialState = {};

export default function(state = initialState, action) {
  if (action.type.includes(FORM)) {
    return updateForm(state, action);
  }

  switch (action.type) {

    default:
      return state;
  }
}

function updateForm(state, action) {
  const formID = action.formID;
  const newFormState = formReducer(state[formID], action);
  return (newFormState == state[formID])
    ? state
    : Object.assign({}, state, {
      [formID]: newFormState
    });
}