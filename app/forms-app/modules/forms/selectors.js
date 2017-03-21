import { createSelector } from 'reselect';

import { NAME } from './constants';
import { forms } from './model';

export const getAll = (state) => state[NAME];

export const getDB = (state) => getAll(state).db;

export const getSortField = (state) => getAll(state).sort.field;
export const getSortDataType = (state) => getAll(state).sort.type;
export const getSortDir = (state) => getAll(state).sort.dir;

export const getSort = (state) => getAll(state).sort;

const getAscSortedForms = createSelector(
  getDB,
  getSortField,
  getSortDataType,
  (db, field, compareType) => {
    return forms.getForms(db, {
      field,
      type: compareType
    });
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

export const getForms = (state) => getSortedForms(state);

export const getForm = (state, formId) => {
  const db = getAll(state).db;
  return forms.get(db, formId);
}