import * as t from './actionTypes';

const initialState = {
  entities: [],
  fethedLast: null
};

export default function(state = initialState, action) {
  switch (action.type) {

    case t.SUBSCRIBE_RECEIVE:
      return {
        entities: [
          ...action.result,
          ...state.entities
        ],
        fetchedLast: Date.now()
      }

    case t.FETCH:
      return state;

    case t.FETCH_FAILURE:
      return state;

    case t.FETCH_SUCCESS:
      return {
        entities: action.result,
        fetchedLast: Date.now()
      };

    default:
      return state;
  }
}