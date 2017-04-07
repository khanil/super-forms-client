import * as t from './actionTypes';
import * as forms from '../forms/actionTypes';

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

    case forms.COPY:
    case forms.REMOVE:
    case forms.SEND:
      return Object.assign({}, state, {
        payload: Object.assign({}, state.payload, {
          error: null
        })
      });

    case forms.COPY_FAILURE:
    case forms.REMOVE_FAILURE:
    case forms.SEND_FAILURE:
      return Object.assign({}, state, {
        payload: Object.assign({}, state.payload, {
          error: action.error.message
        })
      });

    case forms.COPY_SUCCESS:
    case forms.REMOVE_SUCCESS:
    case forms.SEND_SUCCESS:
      return initialState;

    default:
      return state;
  }
}