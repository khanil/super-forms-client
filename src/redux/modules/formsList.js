import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import createAction from '../../utils/makeActionCreator';
import FormsList from '../../utils/formsList';

//- Actions
export const COPY = 'formsList/COPY';
export const COPY_SUCCESS = 'formsList/COPY_SUCCESS';
export const COPY_FAILURE = 'formsList/COPY_FAILURE';

export const DELETE = 'formsList/DELETE';
export const DELETE_SUCCESS = 'formsList/DELETE_SUCCESS';
export const DELETE_FAILURE = 'formsList/DELETE_FAILURE';

export const FETCH = 'formsList/FETCH';
export const FETCH_SUCCESS = 'formsList/FETCH_SUCCESS';
export const FETCH_FAILURE = 'formsList/FETCH_FAILURE';

export const SEND = 'formsList/SEND';
export const SEND_SUCCESS = 'formsList/SEND_SUCCESS';
export const SEND_FAILURE = 'formsList/SEND_FAILURE';

//- State
const initialState = Map({
  busy: false,
  filter: '',
  db: fromJS({
    relations: {},
    entities: {
      forms: {},
      users: {}
    }
  })
});

//- Reducer
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_SUCCESS:
      return state.merge({
        busy: false,
        db: FormsList.convert(action.result)
      });

    default:
      return state;
  }
}
 
//- Action Creators
export function copy(id, name) {
  const uri = `/api/forms/${id}/copy`;
  return {
    types: [COPY, COPY_SUCCESS, COPY_FAILURE],
    promise: (client) => client.post(uri, name),
    id,
    name
  }
}

export function fetch() {
  const uri = `/api/journal`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri)
  }
}

export function remove(id) {
  const uri = `/api/forms/${id}/delete`;
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.delete(uri),
    id
  }
}

export function send(id, config = {}) {
  const uri = `/api/forms/${id}/send`;
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAILURE],
    promise: (client) => client.post(uri, JSON.stringify(config)),
    id,
    config
  }
}

//- Selectors
export const getForms = (state) => (FormsList.getForms(state.get('db')).toJS());