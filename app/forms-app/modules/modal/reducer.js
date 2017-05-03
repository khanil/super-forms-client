import * as t from './actionTypes';

export const initialState = {
  id: null,
  payload: undefined,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SHOW:
      return {
        id: action.modalId,
        payload: action.payload
      };

    case t.HIDE:
      return initialState;

    case t.INJECT_PROPS:
      return inject(state, action);

    default:
      return state;
  }
}

function inject(state, action) {
  return Object.assign({}, state, {
    payload: Object.assign({}, state.payload, action.payload)
  });
}