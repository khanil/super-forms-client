import * as t from './actionTypes';

export function add(forms) {
  return {
    type: t.ADD,
    payload: {
      forms
    }
  }
}