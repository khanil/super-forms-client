import * as t from './actionTypes';

export function copy(form_id, title, user_id) {
  const uri = `/api/forms/${form_id}/copy`;
  return {
    types: [t.COPY, t.COPY_SUCCESS, t.COPY_FAILURE],
    promise: (client) => client.post(uri, title),
    payload: {
      origin_id: form_id,
      info: {
        title,
        user_id
      }
    }
  }
}

export function fetch() {
  const uri = `/api/journal`;
  return {
    types: [t.FETCH, t.FETCH_SUCCESS, t.FETCH_FAILURE],
    promise: (client) => client.get(uri)
  }
}

export function remove(form_id) {
  const uri = `/api/forms/${form_id}/delete`;
  return {
    types: [t.REMOVE, t.REMOVE_SUCCESS, t.REMOVE_FAILURE],
    promise: (client) => client.delete(uri),
    payload: {
    	form_id
    }
  }
}

export function send(form_id, config) {
  const uri = `/api/forms/${form_id}/send`;
  return {
    types: [t.SEND, t.SEND_SUCCESS, t.SEND_FAILURE],
    promise: (client) => client.post(uri, JSON.stringify(config)),
    payload: {
    	form_id,
    	config
    }
  }
}