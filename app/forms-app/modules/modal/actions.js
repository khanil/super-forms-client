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

export function showBriefly(modalId, payload, visibleTime) {
  return d => {
    d(show(modalId, payload));
    setTimeout( () => { d(hide()) }, visibleTime );
  }
}

export function inject(payload) {
  return {
    type: t.INJECT_PROPS,
    payload
  }
}