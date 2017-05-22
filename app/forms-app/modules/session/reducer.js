import * as t from './actionTypes';

export const initialState = {
  activeTab: "",
  user: "",
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SET_DEFAULT_REQUEST:
      return Object.assign({}, state, {
        activeTab: action.payload.activeTab
      });

    default:
      return state;
  }
}