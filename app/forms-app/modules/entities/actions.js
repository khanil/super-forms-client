import * as t from './actionTypes';

export function add(entityName, entries) {
  return {
    type: t.ADD,
    payload: {
      entityName,
      entries
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

export function copy(entityName, id, copyId, changes) {
  return {
    type: t.COPY,
    payload: {
      entityName,
      id,
      copyId,
      changes
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