import * as t from './actionTypes';

export function add(entityName, id, entry) {
  return {
    type: t.ADD,
    payload: {
      entityName,
      id,
      entry
    }
  }
}

export function remove(entityName, id) {
  return {
    type: t.REMOVE,
    payload: {
      entityName,
      id
    }
  }
}

export function copy(entityName, id, copyId) {
  return {
    type: t.COPY,
    payload: {
      entityName,
      id,
      copyId
    }
  }
}

export function update(entityName, id, changes) {
  return {
    type: t.UPDATE,
    payload: {
      entityName,
      id,
      changes
    }
  }
}