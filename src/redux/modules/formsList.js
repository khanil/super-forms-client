import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import createAction from '../../utils/makeActionCreator';
import FormsList from '../../utils/formsList';

//- Actions
export const COPY = 'formsList/COPY';
export const COPY_SUCCESS = 'formsList/COPY_SUCCESS';
export const COPY_FAILURE = 'formsList/COPY_FAILURE';

export const REMOVE = 'formsList/REMOVE';
export const REMOVE_SUCCESS = 'formsList/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'formsList/REMOVE_FAILURE';

export const FETCH = 'formsList/FETCH';
export const FETCH_SUCCESS = 'formsList/FETCH_SUCCESS';
export const FETCH_FAILURE = 'formsList/FETCH_FAILURE';

export const SEND = 'formsList/SEND';
export const SEND_SUCCESS = 'formsList/SEND_SUCCESS';
export const SEND_FAILURE = 'formsList/SEND_FAILURE';

/*TODO: extract*/ 
export const FILTER_BY_NAME = 'formsList/FILTER_BY_NAME';

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
  const db = state.get('db');
  switch(action.type) {
    case FETCH:
    case COPY:
    case REMOVE:
    case SEND:
      return state.set('busy', true);

    case COPY_SUCCESS:
      const info = Object.assign(action.info, action.result);
      return state.merge({
        busy: false,
        db: FormsList.copyForm(db, action.origin_id, info, info.user_id)
      });

    case FETCH_SUCCESS:
      return state.merge({
        busy: false,
        db: FormsList.init(action.result)
      });

    case REMOVE_SUCCESS:
      return state.merge({
        busy: false,
        db: FormsList.removeForm(db, action.form_id)
      });

    case SEND_SUCCESS:
      return state.merge({
        busy: false,
        db: FormsList.sendForm(db, action.form_id, action.config)
      });

    case FETCH_FAILURE:
    case COPY_FAILURE:
    case REMOVE_FAILURE:
    case SEND_FAILURE:
      return state.merge({
        busy: false,
        error: action.error
      });

    case FILTER_BY_NAME:
      return state.set('filter', action.filter);

    default:
      return state;
  }
}
 
//- Action Creators
export function copy(form_id, title, user_id) {
  const uri = `/api/forms/${form_id}/copy`;
  return {
    types: [COPY, COPY_SUCCESS, COPY_FAILURE],
    promise: (client) => client.post(uri, title),
    origin_id: form_id,
    info: { 
      title,
      user_id
    }
  }
}

export function fetch() {
  const uri = `/api/journal`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri)
  }
}

export function remove(form_id) {
  const uri = `/api/forms/${form_id}/delete`;
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE],
    promise: (client) => client.delete(uri),
    form_id
  }
}

export function send(form_id, config) {
  const uri = `/api/forms/${form_id}/send`;
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAILURE],
    promise: (client) => client.post(uri, JSON.stringify(config)),
    form_id,
    config
  }
}

export const filter = createAction(FILTER_BY_NAME, 'filter');

//- Selectors
const getDB = (state) => state.get('db');
export const getStatus = (state) => state.get('busy');
export const getFilter = (state) => state.get('filter').trim();

export const getFormsByUser = (state, user_id) => (FormsList.getFormsByUser(state.get('db'), user_id));

export const getForms = createSelector(
  [getDB, getFilter],
  (db, filter) => FormsList.getForms(db, filter)
);