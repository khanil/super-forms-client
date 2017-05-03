import * as t from './actionTypes';
import * as model from './model';

export const initialState = {
  entities: {},
  errors: {},
  fetchStatus: {},
}

export default function(state = initialState, action) {
  switch (action.type) {

    case t.DELETE_SUCCESS:
      return remove(state, action.meta);

    case t.SEND_SUCCESS:
      return send(state, action);

    case t.COPY_SUCCESS:
      return copy(state, action);

    default:
      return state;
  }
}

function remove(state, { id }) {
  return Object.assign({}, state, {
    entities: Object.assign({}, state.entities, {
      [id]: Object.assign({}, state.entities[id], {
        isDeleted: true
      })
    })
  })
}

function send(state, action) {
  const id = action.meta.id;

  return Object.assign({}, state, {
    entities: Object.assign({}, state.entities, {
      [id]: Object.assign({}, state.entities[id], {
        sent: Date.now() //TODO: fetch from server via payload
      })
    })
  })
}

function copy(state, action) {
  const { payload, meta } = action;
  const origin = state.entities[meta.id];
  const copy = Object.assign({}, origin, {
    resp_count: null,
    created: Date.now(), //TODO: fetch from server via payload
    edited: null,
    expires: null,
    ...meta,
    ...payload,
  });

  return Object.assign({}, state, {
    entities: Object.assign({}, state.entities, {
      [payload.id]: copy
    })
  })
}

