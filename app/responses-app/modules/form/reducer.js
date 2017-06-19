import * as t from './actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {

  	case t.FETCH:
  		return state;

  	case t.FETCH_SUCCESS:
    console.log(t.FETCH_SUCCESS);
      return state;

    case t.FETCH_FAILURE:
      console.log('Error: ' + t.FETCH_FAILURE);
      return state;

    default:
      return state;
  }
}