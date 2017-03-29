import { createSelector } from 'reselect';

import { NAME } from './constants';
import { forms } from './model';

import { getSort } from '../tables/selectors';

export const getAll = (state) => state[NAME];
export const getDB = (state) => getAll(state).db;
export const getForm = (state, formId) => {
  const db = getAll(state).db;
  return forms.get(db, formId);
}

export function makeFormsSelector(sortSelector, filterSelector) {
  const getSortField = (state) => sortSelector(state).key;
  const getSortDataType = (state) => sortSelector(state).type;
  const getSortDir = (state) => sortSelector(state).order;

  const getFilteredForms = createSelector(
    getDB,
    filterSelector,
    (db, filter) => {
      if (!filter || filter === "") {
        return forms.getAll(db);
      }

      return forms.getFormsByUsername(db, filter);
    }
  );

  const getAscSortedForms = createSelector(
    getFilteredForms,
    getSortField,
    getSortDataType,
    (formsList, field, compareType) => {
      return forms.sort(formsList, field, compareType);
    }
  );

  const getSortedForms = createSelector(
    getAscSortedForms,
    getSortDir,
    (formsList, dir) => {
      if (dir === 'desc') {
        return formsList.slice().reverse();
      }

      return formsList;
    }
  );

  return (state) => getSortedForms(state);
}

export function makeUserFormsSelector(sortSelector) {
  const getSortField = (state) => sortSelector(state).key;
  const getSortDataType = (state) => sortSelector(state).type;
  const getSortDir = (state) => sortSelector(state).order;

  const getUserID = (state) => state.user;

  const getFilteredForms = createSelector(
    getDB,
    getUserID,
    (db, userID) => {
      return forms.getFormsByUser(db, userID);
    }
  );

  const getAscSortedForms = createSelector(
    getFilteredForms,
    getSortField,
    getSortDataType,
    (formsList, field, compareType) => {
      return forms.sort(formsList, field, compareType);
    }
  );

  const getSortedForms = createSelector(
    getAscSortedForms,
    getSortDir,
    (formsList, dir) => {
      if (dir === 'desc') {
        return formsList.slice().reverse();
      }

      return formsList;
    }
  );

  return (state) => getSortedForms(state);
}