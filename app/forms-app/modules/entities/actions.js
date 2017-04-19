import * as t from './actionTypes';

export function add(entities) {
  return {
    type: t.ADD,
    payload: entities
  }
}