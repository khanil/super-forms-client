import * as t from './actionTypes';

export function fetch(id) {
  const uri = `/api/forms/${id}`;
  return {
    types: [t.FETCH, t.FETCH_SUCCESS, t.FETCH_FAILURE],
    promise: (client) => client.get(uri),
    payload: {
    	id
    }
  }
}