import * as t from './actionTypes';

export function addField(form, key, draft, pos) {
  return {
    type: t.FIELD_ADD,
    payload: {
      form,
      key,
      draft,
      pos
    }
  }
}

export function removeField(form, key) {
  return {
    type: t.FIELD_REMOVE,
    payload: {
      form,
      key
    }
  }
}

export function moveField(form, key, moveTo) {
  return {
    type: t.FIELD_MOVE,
    payload: {
      form,
      key,
      moveTo
    }
  }
}