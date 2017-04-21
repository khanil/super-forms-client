import { createSelector } from 'reselect';

import { NAME } from './constants';

export const getAll = (state) => state[NAME];

export const getQuery = (state) => {
  const store = getAll(state);
  return store.query;
}

export const getResult = (state) => {
  const store = getAll(state);
  return store.result;
}