import * as t from './actionTypes';

export function show(modalId, payload) {
  return {
    type: t.SHOW,
    modalId,
    payload
  }
}

export function hide(modalId) {
  return {
    type: t.HIDE,
    modalId
  }
}