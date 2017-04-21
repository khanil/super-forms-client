import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntity } from '../entities/selectors';

export const getAll = (state) => state[NAME];

export const getUserForms = (state, userID) => {
  const store = getAll(state);
  const userForms = store[userID] || [];
  return userForms.map((formID) => {
    return {
      ...getEntity(state, "users", userID),
      ...getEntity(state, "forms", formID),
    }
  })
}

export const getUsersForms = (state, usersIDs) => {
  let result = [];
  usersIDs.forEach((userID) => {
    result = [
      ...result,
      ...getUserForms(state, userID)
    ];
  });
  return result;
}