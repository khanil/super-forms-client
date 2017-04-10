import * as t from './actionTypes';

export function add(users) {
  return {
    type: t.ADD,
    payload: {
      users
    }
  }
}